import * as types from '../types';

export interface State {
  users: {
    ids: string[];
    byID: Record<types.User['id'], types.User>;
  };
  messages: Record<types.Message['id'], types.Message>;
}
export type { Action } from '../actions';
