import * as types from '../types';

export interface State {
  users: Record<types.User['id'], types.User>;
  messages: Record<types.Message['id'], types.Message>;
}
export type { Action } from '../actions';
