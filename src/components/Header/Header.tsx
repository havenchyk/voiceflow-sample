import React, { FC } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';

import styles from './styles.module.css';

const pathToTitleMap: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/chat/:userID': 'Chat',
};

const Header: FC = () => {
  const location = useLocation();
  const path = Object.keys(pathToTitleMap).find((path) =>
    matchPath(location.pathname, {
      path,
    })
  );

  const title = pathToTitleMap[path as string] ?? 'Default title';

  return (
    <header className={styles.root}>
      <Link to="/">
        <img alt="logo" height="56" src={`${process.env.PUBLIC_URL}/pizza.png`} />
      </Link>
      <span className={styles.title}>{title}</span>
    </header>
  );
};

export default Header;
