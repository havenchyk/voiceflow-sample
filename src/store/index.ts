// eslint-disable import/prefer-default-export
import { messagesReducer } from './messages';
import { Action, State } from './types';
import { usersReducer } from './users';

type StateKeys = keyof State;

// TODO: make it generic
const combineReducers = (reducers: any) =>
  function combinedReducer(state: State, action: Action) {
    const newState: State = {
      users: {
        ids: [],
        byID: {},
      },
      messages: {},
    };

    // eslint-disable-next-line no-restricted-syntax
    for (const [name, reducer] of Object.entries(reducers)) {
      (newState[name as StateKeys] as State[StateKeys]) = (reducer as any)(state[name as StateKeys], action);
    }

    return newState;
  };

export const rootReducer = combineReducers({
  users: usersReducer,
  messages: messagesReducer,
});

export * from './types';
