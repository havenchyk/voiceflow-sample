import React, { MouseEvent, MouseEventHandler, useContext } from 'react';
import { Link } from 'react-router-dom';

import * as actions from '../../actions';
import * as types from '../../types';
import { DataContext } from '../Data';
import styles from './styles.module.css';

const CrossIcon = ({ onClick }: { onClick: (e: MouseEvent) => void }) => (
  <span onClick={onClick} className={styles.crossIcon}>
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
    <div className={styles.root}>
      <ul className={styles.list}>
        {state.users.ids.length === 0 && (
          <li className={`${styles.item} ${styles.emptyItem}`} key="no-users">
            Please add a user to start a chat
          </li>
        )}
        {state.users.ids.map((userID, index) => {
          const user = state.users.byID[userID];

          return (
            <li className={styles.item} key={index}>
              <Link className={styles.link} to={`/chat/${user.id}`}>
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
