import * as types from '../types';

type AddUserAction = {
  type: 'ADD_USER';
  payload: {
    name: string;
    id: string;
  };
};

type RemoveUserAction = {
  type: 'REMOVE_USER';
  payload: {
    userID: types.User['id'];
    messages: types.User['messages'];
  };
};

type ClearAllAction = {
  type: 'CLEAR_ALL';
};

type NewMessageAction = {
  type: 'NEW_MESSAGE';
  payload: {
    userID: types.User['id'];
  } & types.Message;
};

type Action = AddUserAction | RemoveUserAction | ClearAllAction | NewMessageAction;

const getUniqueLikePostfix = () => Date.now().toString().slice(-5);

export const addUser = (name: string): AddUserAction => {
  const postfix = getUniqueLikePostfix();

  return {
    type: 'ADD_USER',
    payload: {
      name,
      id: `${name}-${postfix}`,
    },
  };
};

export const removeUser = (userID: string, messages: string[]): RemoveUserAction => {
  return {
    type: 'REMOVE_USER',
    payload: {
      userID,
      messages,
    },
  };
};

export const newMessage = (userID: types.User['id'], type: types.Message['type'], text: types.Message['text']): NewMessageAction => {
  const id = `message-${getUniqueLikePostfix()}`;

  return {
    type: 'NEW_MESSAGE',
    payload: {
      userID,
      id,
      type,
      text,
    },
  };
};

export const clearAll = (): ClearAllAction => {
  return {
    type: 'CLEAR_ALL',
  };
};

export type { Action, AddUserAction, ClearAllAction, NewMessageAction, RemoveUserAction };
