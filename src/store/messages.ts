/* eslint-disable import/prefer-default-export */
import { Action, State } from './types';

const initialState = {};

export const messagesReducer = (state: State['messages'] = initialState, action: Action): State['messages'] => {
  switch (action.type) {
    case 'NEW_MESSAGE':
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    // TODO: it can be another event only for messages
    case 'REMOVE_USER':
      return Object.fromEntries(Object.entries(state).filter(([messageID]) => !action.payload.messages.includes(messageID)));
    default:
      return state;
  }
};
