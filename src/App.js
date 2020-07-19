import React from 'react';
// UTILS
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
// PAGES
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import DashboardPage from './components/pages/DashboardPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import NewBookPage from './components/pages/NewBookPage';
import TopNavigation from './components/navigation/TopNavigation';
// ROUTES
import AuthRoute from './components/routes/AuthRoute';
import NonAuthRoute from './components/routes/NonAuthRoute';

function App({ location, isAuthenticated }) {
  return (
    <div className='ui container'>
      {isAuthenticated && <TopNavigation />}
      <Route location={location} exact path='/' component={HomePage} />
      <Route
        location={location}
        exact
        path='/confirmation/:token'
        component={ConfirmationPage}
      />
      <NonAuthRoute
        location={location}
        exact
        path='/login'
        component={LoginPage}
      />
      <NonAuthRoute
        location={location}
        exact
        path='/signup'
        component={SignupPage}
      />
      <NonAuthRoute
        location={location}
        exact
        path='/forgot_password'
        component={ForgotPasswordPage}
      />
      <NonAuthRoute
        location={location}
        exact
        path='/reset_password/:token'
        component={ResetPasswordPage}
      />
      <AuthRoute
        location={location}
        exact
        path='/dashboard'
        component={DashboardPage}
      />
      <AuthRoute
        location={location}
        exact
        path='/books/new'
        component={NewBookPage}
      />
    </div>
  );
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
  };
}

export default connect(mapStateToProps)(App);
