import React, { FC, useContext, useState } from 'react';

import * as actions from '../../actions';
import CreateUser from '../CreateUser';
import { DataContext } from '../Data';
import UsersList from '../UsersList';
import styles from './styles.module.css';

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
    <div className={styles.root}>
      <h4 className={styles.subtitle}>Please choose the user to start or continue a chat about pizza</h4>
      <div className={styles.content}>
        <UsersList />
      </div>

      <div className={styles.actions}>
        <div className={styles.buttons}>
          <button className="button" onClick={showUserForm}>
            Create a New User
          </button>
          <button className="button button-secondary" onClick={handleClearAll}>
            Clear all users
          </button>
        </div>

        {isUserFormVisible && (
          <div className={styles.createUser}>
            <CreateUser onSubmit={handleCreateUserSubmit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
