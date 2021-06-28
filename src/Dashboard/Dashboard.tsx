/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './styles.css';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CreateUser from '../CreateUser';
import { storage } from '../utils';

// TODO: check if the users on the list before redirecting to the chat route
const Dashboard: React.FC = () => {
  const [isUserFormVisible, setIsUserFormVisible] = useState(false);
  const [users, setUsers] = useState<string[]>([]);

  // initial loading from localStorage
  useEffect(() => {
    const savedUsers = storage.getUsers();

    if (savedUsers && savedUsers.length > 0) {
      setUsers(savedUsers);
    }
  }, []);

  // serialize users
  useEffect(() => {
    if (users && users.length > 0) {
      storage.setUsers(users);
    }
  }, [users]);

  const showUserForm = () => setIsUserFormVisible(true);
  const hideUserForm = () => setIsUserFormVisible(false);

  const handleCreateUserSubmit = (user: string) => {
    // TODO: check that user does not exist on the list
    if (user) {
      setUsers((users) => {
        if (users.includes(user)) {
          return users;
        }

        return [...users, user];
      });
    }

    hideUserForm();
  };

  const handleRemoveUser =
    (user: string): React.MouseEventHandler =>
    (e) => {
      e.preventDefault();

      removeUser(user);
    };

  const handleClear = () => {
    storage.removeAllUsers();

    setUsers([]);
  };

  const removeUser = (user: string) => {
    setUsers((oldUsers) => oldUsers.filter((name) => name !== user));

    storage.removeUser(user);
  };

  return (
    <div className="dashboard">
      <h4 className="dashboard--subtitle">Please choose the user to start or continue a chat about pizza</h4>
      <div className="dashboard--content">
        <div className="list-wrapper">
          <ul className="list">
            {users.length === 0 && (
              <li className="list--item list--item-empty" key="no-users">
                Please add a user to start a chat
              </li>
            )}
            {users.map((user, index) => (
              <li className="list--item" key={index}>
                <Link className="list--link" to={`/chat/${user.toLowerCase()}`}>
                  {user}{' '}
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
          <button className="button button-secondary" onClick={handleClear}>
            Clear users
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
