import RPCClient from '@alicloud/pop-core';
import { ECSActions } from '../../steps/ecs/client/types/request';

export type Action = ECSActions;
export type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export interface Request<T> {
  client: RPCClient;
  action: Action;
  parameters: T;
  options?: RequestOptions;
}

export interface RequestOptions {
  method?: Method; // defaults to GET
  timeout?: number; // defaults to 3000 ms
  headers?: Record<string, any>; // defaults to an empty set of headers
  formatAction?: boolean; // default true, format the action to a valid Action string
  formatParams?: boolean; // default true, format the parameter name so that the first letter is upper case
}
