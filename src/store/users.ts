/* eslint-disable import/prefer-default-export */
import { Action, State } from './types';

const initialState = {};

export const usersReducer = (state: State['users'] = initialState, action: Action): State['users'] => {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, [action.payload.id]: { ...action.payload, messages: [] } };
    case 'REMOVE_USER':
      return Object.fromEntries(Object.entries(state).filter(([id]) => id !== action.payload.userID));
    case 'CLEAR_ALL':
      return {};
    case 'NEW_MESSAGE':
      return {
        ...state,
        [action.payload.userID]: {
          ...state[action.payload.userID],
          messages: state[action.payload.userID].messages.concat(action.payload.id),
        },
      };
    default:
      return state;
  }
};
