import './styles.css';

import React, { MouseEvent, MouseEventHandler, useContext } from 'react';
import { Link } from 'react-router-dom';

import * as actions from '../actions';
import { DataContext } from '../Data';
import * as types from '../types';

const CrossIcon = ({ onClick }: { onClick: (e: MouseEvent) => void }) => (
  <span onClick={onClick} className="user-list--link-cross-icon">
    +
  </span>
);

const UsersList: React.FC = () => {
  const { state, dispatch } = useContext(DataContext);

  const handleRemoveUser =
    (user: types.User): MouseEventHandler =>
    (e) => {
      e.preventDefault();

      dispatch(actions.removeUser(user.id, user.messages));
    };

  return (
    <div className="list-wrapper">
      <ul className="user-list">
        {state.users.ids.length === 0 && (
          <li className="user-list--item user-list--item-empty" key="no-users">
            Please add a user to start a chat
          </li>
        )}
        {state.users.ids.map((userID, index) => {
          const user = state.users.byID[userID];

          return (
            <li className="user-list--item" key={index}>
              <Link className="user-list--link" to={`/chat/${user.id}`}>
                {user.name} <CrossIcon onClick={handleRemoveUser(user)} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UsersList;
