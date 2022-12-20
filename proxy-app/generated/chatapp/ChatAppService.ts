// Original file: ../protos/app.proto

import type * as grpc from 'grpc'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ChatAppStreamRequest as _chatapp_ChatAppStreamRequest, ChatAppStreamRequest__Output as _chatapp_ChatAppStreamRequest__Output } from '../chatapp/ChatAppStreamRequest';
import type { ChatAppStreamResponse as _chatapp_ChatAppStreamResponse, ChatAppStreamResponse__Output as _chatapp_ChatAppStreamResponse__Output } from '../chatapp/ChatAppStreamResponse';

export interface ChatAppServiceClient extends grpc.Client {
  ChatAppBidirectionalStream(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_chatapp_ChatAppStreamRequest, _chatapp_ChatAppStreamResponse__Output>;
  ChatAppBidirectionalStream(options?: grpc.CallOptions): grpc.ClientDuplexStream<_chatapp_ChatAppStreamRequest, _chatapp_ChatAppStreamResponse__Output>;
  chatAppBidirectionalStream(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_chatapp_ChatAppStreamRequest, _chatapp_ChatAppStreamResponse__Output>;
  chatAppBidirectionalStream(options?: grpc.CallOptions): grpc.ClientDuplexStream<_chatapp_ChatAppStreamRequest, _chatapp_ChatAppStreamResponse__Output>;
  
}

export interface ChatAppServiceHandlers extends grpc.UntypedServiceImplementation {
  ChatAppBidirectionalStream: grpc.handleBidiStreamingCall<_chatapp_ChatAppStreamRequest__Output, _chatapp_ChatAppStreamResponse>;
  
}

export interface ChatAppServiceDefinition extends grpc.ServiceDefinition {
  ChatAppBidirectionalStream: MethodDefinition<_chatapp_ChatAppStreamRequest, _chatapp_ChatAppStreamResponse, _chatapp_ChatAppStreamRequest__Output, _chatapp_ChatAppStreamResponse__Output>
}
