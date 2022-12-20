import type * as grpc from 'grpc';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ChatAppServiceClient as _chatapp_ChatAppServiceClient, ChatAppServiceDefinition as _chatapp_ChatAppServiceDefinition } from './chatapp/ChatAppService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  chatapp: {
    ChatAppService: SubtypeConstructor<typeof grpc.Client, _chatapp_ChatAppServiceClient> & { service: _chatapp_ChatAppServiceDefinition }
    ChatAppStreamRequest: MessageTypeDefinition
    ChatAppStreamResponse: MessageTypeDefinition
  }
}

