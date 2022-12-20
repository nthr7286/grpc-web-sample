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
import { ChatWebUnaryResponse, ChatWebUnaryResponse__Output } from '../generated/chatweb/ChatWebUnaryResponse'
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

const test = () => {
  const appTargetPort = process.env.APP_TARGET_PORT ?? '50051'
  const appProtoFile = resolve(process.cwd(), '../protos/app.proto')
  const { ChatAppService } = ((loadPackageDefinition(loadSync(appProtoFile)) as unknown) as AppProtoGrpcType).chatapp
  const chatAppServiceClient = new ChatAppService(
    `localhost:${appTargetPort}`,
    credentials.createInsecure(),
  )
  const call = chatAppServiceClient.ChatAppBidirectionalStream()
  call.on('data', (chunk: ChatAppStreamResponse__Output) => {
    console.log(chunk)
    call.end()
  })
  call.on('error', error => {
    console.error(error)
  })
  call.on('end', () => {
    console.info('call end')
  })
  call.write({
    message: 'test'
  })
}

test()