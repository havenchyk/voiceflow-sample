import './styles.css';

import React from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';

const pathToTitleMap: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/chat/:userID': 'Chat',
};

const Header = () => {
  const location = useLocation();
  const path = Object.keys(pathToTitleMap).find((path) =>
    matchPath(location.pathname, {
      path,
    })
  );

  // TODO: check types
  const title = pathToTitleMap[path as string] ?? 'Default title';

  return (
    <header className="header">
      <Link to="/">
        <img alt="logo" height="56" src={`${process.env.PUBLIC_URL}/pizza.png`} />
      </Link>
      <span className="header--title">{title}</span>
    </header>
  );
};

export default Header;
