/* eslint-disable import/prefer-default-export */
import { Action, State } from './types';

const initialState = {
  ids: [],
  byID: {},
};

export const usersReducer = (state: State['users'] = initialState, action: Action): State['users'] => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        ids: [...state.ids, action.payload.id],
        byID: {
          ...state.byID,
          [action.payload.id]: { ...action.payload, messages: [] },
        },
      };
    case 'REMOVE_USER':
      return {
        ids: state.ids.filter((id) => id !== action.payload.userID),
        byID: Object.fromEntries(Object.entries(state.byID).filter(([id]) => id !== action.payload.userID)),
      };
    case 'CLEAR_ALL':
      return {
        ids: [],
        byID: {},
      };
    case 'NEW_MESSAGE':
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.userID]: {
            ...state.byID[action.payload.userID],
            messages: state.byID[action.payload.userID].messages.concat(action.payload.id),
          },
        },
      };
    default:
      return state;
  }
};
