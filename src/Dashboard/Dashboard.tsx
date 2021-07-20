import './styles.css';

import React, { FC, MouseEventHandler, useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import * as actions from '../actions';
import CreateUser from '../CreateUser';
import { DataContext } from '../Data';
import * as types from '../types';

// TODO: check if the users on the list before redirecting to the chat route
const Dashboard: FC = () => {
  const [isUserFormVisible, setIsUserFormVisible] = useState(false);
  const { state, dispatch } = useContext(DataContext);

  const showUserForm = () => setIsUserFormVisible(true);
  const hideUserForm = () => setIsUserFormVisible(false);

  const handleCreateUserSubmit = () => {
    hideUserForm();
  };

  const handleRemoveUser =
    (user: types.User): MouseEventHandler =>
    (e) => {
      e.preventDefault();

      dispatch(actions.removeUser(user.id, user.messages));
    };

  const handleClearAll = () => {
    dispatch(actions.clearAll());
  };

  return (
    <div className="dashboard">
      <h4 className="dashboard--subtitle">Please choose the user to start or continue a chat about pizza</h4>
      <div className="dashboard--content">
        <div className="list-wrapper">
          <ul className="list">
            {Object.keys(state.users).length === 0 && (
              <li className="list--item list--item-empty" key="no-users">
                Please add a user to start a chat
              </li>
            )}
            {Object.values(state.users).map((user, index) => (
              <li className="list--item" key={index}>
                <Link className="list--link" to={`/chat/${user.id}`}>
                  {user.name}{' '}
                  <span onClick={handleRemoveUser(user)} className="list--link-close-icon">
                    +
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="dashboard--actions">
        <div className="dashboard--buttons">
          <button className="button" onClick={showUserForm}>
            Create a New User
          </button>
          <button className="button button-secondary" onClick={handleClearAll}>
            Clear all users
          </button>
        </div>

        {isUserFormVisible && (
          <div className="create-user-form-wrapper">
            <CreateUser onSubmit={handleCreateUserSubmit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
