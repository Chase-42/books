import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import AuthRoute from './components/routes/AuthRoute';
import NonAuthRoute from './components/routes/NonAuthRoute';

function App({ location }) {
  return (
    <div className='ui container'>
      <Route location={location} exact path='/' component={HomePage} />
      <NonAuthRoute
        location={location}
        exact
        path='/login'
        component={LoginPage}
      />
      <AuthRoute
        location={location}
        exact
        path='/dashboard'
        component={DashboardPage}
      />
    </div>
  );
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
