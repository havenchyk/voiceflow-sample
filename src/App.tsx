import './App.css';

import React, { FC } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Chat from './components/Chat';
import Dashboard from './components/Dashboard';
import Data from './components/Data';
import Footer from './components/Footer';
import Header from './components/Header';

const DASHBOARD_ROUTE = '/dashboard';
const CHAT_ROUTE = '/chat/:userID';

const App: FC = () => {
  return (
    <Router>
      <Data>
        <Header />
        <Switch>
          <Route path={DASHBOARD_ROUTE} component={Dashboard} />
          <Route path={CHAT_ROUTE} component={Chat} />
          <Redirect to={DASHBOARD_ROUTE} />
        </Switch>
        <Footer />
      </Data>
    </Router>
  );
};

export default App;
