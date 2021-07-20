import React, { createContext, FC, ReactNode, useEffect, useReducer } from 'react';

import { Action } from './actions';
import { rootReducer, State } from './store';

const initialState: State = {
  users: {
    ids: [],
    byID: {},
  },
  messages: {},
};

const initializer = (initialValue = initialState) => JSON.parse(`${localStorage.getItem('state')}`) || initialValue;

export const DataContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  // this is a placeholder for dispatch
  dispatch: () => null,
});

interface Props {
  children?: ReactNode;
}

// how should the restore from cache look like?
// initial loading -> check if something exist in the localStorage -> if exists, restore, if not, do nothing

// main actions:
// ADD_USER - adding a user
// REMOVE_USER - removing a user, removing messages related to that user
// CLEAR_ALL - removing all users, removing all messages
// NEW_MESSAGE - adding a new message (can be req/res), add messageId to the user's messages

// shapes of state:
// USERS
// {[id]: {id: string, name: string, messages: string[]}}
//
// Messages
// {[id]: {id: string, ...}}

const Data: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<(state: State, action: Action) => State>(rootReducer, initialState, initializer as any);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
  }, [state]);

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default Data;
