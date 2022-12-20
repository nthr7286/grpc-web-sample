import { resolve } from 'path'
import {
  credentials,
  Server,
  ServerCredentials,
  loadPackageDefinition,
  // ServerWritableStream,
  ClientDuplexStream,
  ServiceError,
  status,
  Metadata,
} from 'grpc'
import { loadSync } from '@grpc/proto-loader'
import { ProtoGrpcType as AppProtoGrpcType } from '../generated/app'
import { ProtoGrpcType as WebProtoGrpcType} from '../generated/web'
import { ChatWebServiceHandlers } from '../generated/chatweb/ChatWebService'
// import { ChatWebServerSideStreamRequest, ChatWebServerSideStreamRequest__Output } from '../generated/chatweb/ChatWebServerSideStreamRequest'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { ChatWebServerSideStreamResponse } from '../generated/chatweb/ChatWebServerSideStreamResponse'
import { randomUUID } from 'crypto'
import { ChatWebUnaryResponse } from '../generated/chatweb/ChatWebUnaryResponse'
import { ChatAppStreamRequest, ChatAppStreamRequest__Output } from '../generated/chatapp/ChatAppStreamRequest'
import { ChatAppStreamResponse, ChatAppStreamResponse__Output } from '../generated/chatapp/ChatAppStreamResponse'

expand(config())

class CustomServiceError extends Error implements ServiceError {
  code?: status
  details?: string
  constructor(code?: status, details?: string, message?: string) {
    super(message)
    this.code = code
    this.details = details
  }
}

const main = () => {
  const port = process.env.PORT ?? '50051'
  const appTargetPort = process.env.APP_TARGET_PORT ?? '50051'
  const appProtoFile = resolve(process.cwd(), '../protos/app.proto')
  const webProtoFile = resolve(process.cwd(), '../protos/web.proto')
  const { ChatAppService } = ((loadPackageDefinition(loadSync(appProtoFile)) as unknown) as AppProtoGrpcType).chatapp
  console.log('appTargetPort', appTargetPort)
  const chatAppServiceClient = new ChatAppService(
    `host.docker.internal:${appTargetPort}`,
    credentials.createInsecure(),
  )
  const { ChatWebService } = ((loadPackageDefinition(loadSync(webProtoFile)) as unknown) as WebProtoGrpcType).chatweb
  const chatAppBidirectionalStreamCallMap = new Map<
    string,
    ClientDuplexStream<ChatAppStreamRequest, ChatAppStreamResponse__Output>
  >()
  const handlers: ChatWebServiceHandlers = {
    ChatWebUnary: async (call, callback) => {
      console.log(call.request.id, call.request.message)
      const { id, message } = call.request
      if (!id) {
        const error: ServiceError = new CustomServiceError(status.INVALID_ARGUMENT, 'id undefined', 'id undefiend')
        console.error(error)
        callback(error, null)
        return
      }
      const chatAppBidirectionalStreamCall = chatAppBidirectionalStreamCallMap.get(id)
      if (!chatAppBidirectionalStreamCall) {
        const error: ServiceError = new CustomServiceError(status.INVALID_ARGUMENT, 'id invalid', 'id invalid')
        console.error(error)
        callback(error, null)
        return
      }
      console.log(
        chatAppBidirectionalStreamCall.writableEnded,
        chatAppBidirectionalStreamCall.writableFinished,
        chatAppBidirectionalStreamCall.readableEnded,
      )
      if (chatAppBidirectionalStreamCall.writableEnded) {
        const error: ServiceError = new CustomServiceError(status.INVALID_ARGUMENT, 'chatAppBidirectionalStream is not writable', 'chatAppBidirectionalStream is not writable')
        console.error(error)
        callback(error, null)
        return
      }
      const chatAppBidirectionalStreamRequest: ChatAppStreamRequest = {
        message,
      }
      chatAppBidirectionalStreamCall.write(chatAppBidirectionalStreamRequest)
      const response: ChatWebUnaryResponse = {
        id,
        message: 'success',
      }
      callback(null, response)
      return
    },
    ChatWebServerSideStream: async call => {
      const { 'x-request-id': requestIdMetadataValue } = call.metadata.getMap()
      const requestId = requestIdMetadataValue.toString() ?? randomUUID()
      const clientCall = chatAppServiceClient.ChatAppBidirectionalStream()
      console.log('chatWebServerSideStream connected', call.request.username)

      clientCall.on('data', (chunk: ChatAppStreamResponse__Output) => {
        console.log(chunk)
        const {
          message,
        } = chunk
        const response: ChatWebServerSideStreamResponse = {
          id: requestId,
          message,
        }
        call.write(response)
        return
      })
      clientCall.on('error', error => {
        console.error('chatAppStreamError', error)
        call.emit('error', new Error(error.message))
        if (error instanceof CustomServiceError) {
          const response: ChatWebServerSideStreamResponse = {
            id: requestId,
            error: {
              code: error.code,
              message: error.message,
              details: error.details
            }
          }
          call.write(response)
        }
        else if (error instanceof Error) {
          const response: ChatWebServerSideStreamResponse = {
            id: requestId,
            error: {
              code: 14,
              message: error.message,
            }
          }
          call.write(response)
        }
        call.end()
        chatAppBidirectionalStreamCallMap.delete(requestId)
        return
      })
      clientCall.on('close', () => {
        console.warn('chatAppStreamClose')
        call.end()
        chatAppBidirectionalStreamCallMap.delete(requestId)
        return
      })
      clientCall.on('end', () => {
        console.info('chatAppStreamEnd')
        call.end()
        chatAppBidirectionalStreamCallMap.delete(requestId)
        return
      })
      chatAppBidirectionalStreamCallMap.set(requestId, clientCall)

      const response: ChatWebServerSideStreamResponse = {
        id: requestId,
      }
      call.write(response)
      // call.on('error', error => {
      //   console.error(error)
      //   call.end()
      // })
      // call.on('close', () => {
      //   console.warn('call closed')
      // })
      // call.on('end', () => {
      //   console.info('call end', requestId)
      //   chatAppBidirectionalStreamCallMap.delete(requestId)
      // })
    }
  }
  const server = new Server()
  server.addService(
    ChatWebService.service,
    handlers,
  )
  server.bind(`0.0.0.0:${port}`, ServerCredentials.createInsecure())
  server.start()
  console.log('Server listening at ', port)
}

main()