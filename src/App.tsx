import './App.css';

import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Chat from './Chat';
import Dashboard from './Dashboard';
import Footer from './Footer';
import Header from './Header';

const DASHBOARD_ROUTE = '/dashboard';
const CHAT_ROUTE = '/chat/:userID';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={DASHBOARD_ROUTE} component={Dashboard} />
        <Route path={CHAT_ROUTE} component={Chat} />
        <Redirect to={DASHBOARD_ROUTE} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
