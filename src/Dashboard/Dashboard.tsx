import './styles.css';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CreateUser from '../CreateUser';
import { localStorage } from '../utils';

// const users = ['Luke', 'John', 'Adam'];

// const FancyLink = React.forwardRef<any, any>((props, ref) => (
//   <a ref={ref} className="list--link" {...props}>
//     💅 {props.children}
//   </a>
// ));

// TODO: check if the users on the list before redirecting to the chat route
const Dashboard: React.FC = () => {
  const [isUserFormVisible, setIsUserFormVisible] = useState(false);
  const [users, setUsers] = useState<string[]>([]);

  const showUserForm = () => setIsUserFormVisible(true);
  const hideUserForm = () => setIsUserFormVisible(false);
  const handleCreateUserSubmit = (username: string) => {
    // check that user does not exist on the list

    setUsers((users) => {
      if (users.includes(username)) {
        return users;
      }

      return users.concat([username]);
    });

    setTimeout(() => {
      hideUserForm();
    }, 500);
  };

  // initial loading from localStorage
  useEffect(() => {
    const savedUsers: string[] | null = JSON.parse(`${localStorage.getItem('users')}`);

    if (savedUsers) {
      setUsers(savedUsers);
    }
  }, []);

  return (
    <div className="dashboard">
      <h4 className="dashboard--subtitle">Please choose the user to start or continue a chat about pizza</h4>
      <div className="dashboard--content">
        <div className="list-wrapper">
          <ul className="list">
            {users.map((user, index) => (
              <li className="list--item" key={index}>
                <Link className="list--link" to={`/chat/${user.toLowerCase()}`}>
                  💅 {user}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="dashboard--actions">
        <div>
          <button onClick={showUserForm}>Create a New User</button>

          {isUserFormVisible && <CreateUser onSubmit={handleCreateUserSubmit} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
