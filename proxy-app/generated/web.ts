import type * as grpc from 'grpc';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ChatWebServiceClient as _chatweb_ChatWebServiceClient, ChatWebServiceDefinition as _chatweb_ChatWebServiceDefinition } from './chatweb/ChatWebService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  chatweb: {
    ChatWebServerSideStreamRequest: MessageTypeDefinition
    ChatWebServerSideStreamResponse: MessageTypeDefinition
    ChatWebService: SubtypeConstructor<typeof grpc.Client, _chatweb_ChatWebServiceClient> & { service: _chatweb_ChatWebServiceDefinition }
    ChatWebUnaryRequest: MessageTypeDefinition
    ChatWebUnaryResponse: MessageTypeDefinition
    Status: MessageTypeDefinition
  }
}

