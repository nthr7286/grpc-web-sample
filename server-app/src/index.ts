import { resolve } from 'path'
import {
  Server,
  ServerCredentials,
  loadPackageDefinition,
} from 'grpc'
import { loadSync } from '@grpc/proto-loader'
import { ProtoGrpcType } from '../generated/app'
import { ChatAppServiceHandlers } from '../generated/chatapp/ChatAppService'
import { ChatAppStreamRequest__Output } from '../generated/chatapp/ChatAppStreamRequest'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

expand(config())

const main = () => {
  const port = process.env.PORT ?? '50051'
  const protoFile = resolve(process.cwd(), '../protos/app.proto')
  const { ChatAppService } = ((loadPackageDefinition(loadSync(protoFile)) as unknown) as ProtoGrpcType).chatapp

  const handlers: ChatAppServiceHandlers = {
    ChatAppBidirectionalStream: call => {
      call.on('data', (chunk: ChatAppStreamRequest__Output) => {
        call.write(`${chunk.message} World!`)
      })
    }
  }
  const server = new Server()
  server.addService(
    ChatAppService.service,
    handlers,
  )
  server.bind(`0.0.0.0:${port}`, ServerCredentials.createInsecure())
  server.start()
  console.log('Server listening at ', port)
}

main()