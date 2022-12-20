import { resolve } from 'path'
import {
  Server,
  ServerCredentials,
  loadPackageDefinition,
  ServerWritableStream,
  ServiceError,
  status,
} from 'grpc'
import { loadSync } from '@grpc/proto-loader'
import { ProtoGrpcType } from '../generated/web'
import { ChatWebServiceHandlers } from '../generated/chatweb/ChatWebService'
import { ChatWebServerSideStreamRequest, ChatWebServerSideStreamRequest__Output } from '../generated/chatweb/ChatWebServerSideStreamRequest'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { ChatWebServerSideStreamResponse } from '../generated/chatweb/ChatWebServerSideStreamResponse'
import { randomUUID } from 'crypto'
import { ChatWebUnaryResponse } from '../generated/chatweb/ChatWebUnaryResponse'

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
  const appProtoFile = resolve(process.cwd(), '../protos/app.proto')
  const webProtoFile = resolve(process.cwd(), '../protos/web.proto')
  const { ChatWebService } = ((loadPackageDefinition(loadSync(webProtoFile)) as unknown) as ProtoGrpcType).chatweb

  const callMap = new Map<
    string,
    ServerWritableStream<ChatWebServerSideStreamRequest__Output, ChatWebServerSideStreamResponse>
  >()
  const handlers: ChatWebServiceHandlers = {
    ChatWebUnary: (call, callback) => {
      console.log(call.request.id, call.request.message)
      const { id, message } = call.request
      if (!id) {
        const error: ServiceError = new CustomServiceError(status.INVALID_ARGUMENT, 'id undefined', 'id undefiend')
        console.error(error)
        callback(error, null)
        return
      }
      const streamCall = callMap.get(id)
      const streamResponse: ChatWebServerSideStreamResponse = {
        id,
        message,
      }
      streamCall?.write(streamResponse)
      streamCall?.end()
      const response: ChatWebUnaryResponse = {
        id,
        message: 'success',
      }
      callback(null, response)
    },
    ChatWebServerSideStream: call => {
      const { 'x-request-id': requestIdMetadataValue } = call.metadata.getMap()
      const requestId = requestIdMetadataValue.toString() ?? randomUUID()
      callMap.set(requestId, call)
      console.log(call.metadata.getMap())
      console.log('ChatWebServerSideStream', requestId, call.request.username)
      const response: ChatWebServerSideStreamResponse = {
        id: requestId,
        message: `Hello ${call.request.username}!`
      }
      call.write(response)
      // call.end()
      call.on('error', error => {
        console.error(error)
      })
      call.on('end', () => {
        console.info('call end', requestId)
      })
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