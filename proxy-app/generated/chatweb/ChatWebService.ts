// Original file: ../protos/web.proto

import type * as grpc from 'grpc'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ChatWebServerSideStreamRequest as _chatweb_ChatWebServerSideStreamRequest, ChatWebServerSideStreamRequest__Output as _chatweb_ChatWebServerSideStreamRequest__Output } from '../chatweb/ChatWebServerSideStreamRequest';
import type { ChatWebServerSideStreamResponse as _chatweb_ChatWebServerSideStreamResponse, ChatWebServerSideStreamResponse__Output as _chatweb_ChatWebServerSideStreamResponse__Output } from '../chatweb/ChatWebServerSideStreamResponse';
import type { ChatWebUnaryRequest as _chatweb_ChatWebUnaryRequest, ChatWebUnaryRequest__Output as _chatweb_ChatWebUnaryRequest__Output } from '../chatweb/ChatWebUnaryRequest';
import type { ChatWebUnaryResponse as _chatweb_ChatWebUnaryResponse, ChatWebUnaryResponse__Output as _chatweb_ChatWebUnaryResponse__Output } from '../chatweb/ChatWebUnaryResponse';

export interface ChatWebServiceClient extends grpc.Client {
  ChatWebServerSideStream(argument: _chatweb_ChatWebServerSideStreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatweb_ChatWebServerSideStreamResponse__Output>;
  ChatWebServerSideStream(argument: _chatweb_ChatWebServerSideStreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatweb_ChatWebServerSideStreamResponse__Output>;
  chatWebServerSideStream(argument: _chatweb_ChatWebServerSideStreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatweb_ChatWebServerSideStreamResponse__Output>;
  chatWebServerSideStream(argument: _chatweb_ChatWebServerSideStreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatweb_ChatWebServerSideStreamResponse__Output>;
  
  ChatWebUnary(argument: _chatweb_ChatWebUnaryRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatweb_ChatWebUnaryResponse__Output>): grpc.ClientUnaryCall;
  ChatWebUnary(argument: _chatweb_ChatWebUnaryRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatweb_ChatWebUnaryResponse__Output>): grpc.ClientUnaryCall;
  ChatWebUnary(argument: _chatweb_ChatWebUnaryRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chatweb_ChatWebUnaryResponse__Output>): grpc.ClientUnaryCall;
  ChatWebUnary(argument: _chatweb_ChatWebUnaryRequest, callback: grpc.requestCallback<_chatweb_ChatWebUnaryResponse__Output>): grpc.ClientUnaryCall;
  chatWebUnary(argument: _chatweb_ChatWebUnaryRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatweb_ChatWebUnaryResponse__Output>): grpc.ClientUnaryCall;
  chatWebUnary(argument: _chatweb_ChatWebUnaryRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatweb_ChatWebUnaryResponse__Output>): grpc.ClientUnaryCall;
  chatWebUnary(argument: _chatweb_ChatWebUnaryRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chatweb_ChatWebUnaryResponse__Output>): grpc.ClientUnaryCall;
  chatWebUnary(argument: _chatweb_ChatWebUnaryRequest, callback: grpc.requestCallback<_chatweb_ChatWebUnaryResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface ChatWebServiceHandlers extends grpc.UntypedServiceImplementation {
  ChatWebServerSideStream: grpc.handleServerStreamingCall<_chatweb_ChatWebServerSideStreamRequest__Output, _chatweb_ChatWebServerSideStreamResponse>;
  
  ChatWebUnary: grpc.handleUnaryCall<_chatweb_ChatWebUnaryRequest__Output, _chatweb_ChatWebUnaryResponse>;
  
}

export interface ChatWebServiceDefinition extends grpc.ServiceDefinition {
  ChatWebServerSideStream: MethodDefinition<_chatweb_ChatWebServerSideStreamRequest, _chatweb_ChatWebServerSideStreamResponse, _chatweb_ChatWebServerSideStreamRequest__Output, _chatweb_ChatWebServerSideStreamResponse__Output>
  ChatWebUnary: MethodDefinition<_chatweb_ChatWebUnaryRequest, _chatweb_ChatWebUnaryResponse, _chatweb_ChatWebUnaryRequest__Output, _chatweb_ChatWebUnaryResponse__Output>
}
