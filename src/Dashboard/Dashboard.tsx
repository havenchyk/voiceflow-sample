import './styles.css';

import React, { FC, useContext, useState } from 'react';

import * as actions from '../actions';
import CreateUser from '../CreateUser';
import { DataContext } from '../Data';
import UsersList from '../UsersList';

// TODO: check if the users on the list before redirecting to the chat route
const Dashboard: FC = () => {
  const [isUserFormVisible, setIsUserFormVisible] = useState(false);
  const { dispatch } = useContext(DataContext);

  const showUserForm = () => setIsUserFormVisible(true);
  const hideUserForm = () => setIsUserFormVisible(false);

  const handleCreateUserSubmit = () => {
    hideUserForm();
  };

  const handleClearAll = () => {
    dispatch(actions.clearAll());
  };

  return (
    <div className="dashboard">
      <h4 className="dashboard--subtitle">Please choose the user to start or continue a chat about pizza</h4>
      <div className="dashboard--content">
        <UsersList />
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
