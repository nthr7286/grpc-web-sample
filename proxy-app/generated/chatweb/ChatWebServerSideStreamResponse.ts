// Original file: ../protos/web.proto

import type { Status as _chatweb_Status, Status__Output as _chatweb_Status__Output } from '../chatweb/Status';

export interface ChatWebServerSideStreamResponse {
  'id'?: (string);
  'message'?: (string);
  'error'?: (_chatweb_Status | null);
}

export interface ChatWebServerSideStreamResponse__Output {
  'id'?: (string);
  'message'?: (string);
  'error'?: (_chatweb_Status__Output);
}
