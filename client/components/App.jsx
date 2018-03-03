import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import LandingPage from './recipes/LandingPage';
import AllRecipes from './recipes/AllRecipes';
import UserRecipes from './recipes/userRecipes/UserRecipes';
import SignUp from './signupPage/connectedComponent/SignUp';
import SignIn from './signinPage/connectedComponent/SignIn';
import UserProfileContainer from '../components/recipes/userProfile/UserProfileContainer';
import { signInFromLocalStorage } from '../actionController/signin';

const history = createBrowserHistory();

/**
 * @class App
 */
class App extends Component {
  /**
   * @description save the userID to store when component mounts
   * @param {*} props
   * @return {object} object
   */
  componentWillMount() {
    this.props.signInFromLocalStorage();
  }

  /**
   * @description display the app
   * @returns {*} app
   */
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/recipes" component={AllRecipes} />
            <Route exact path="/account/recipes" component={UserProfileContainer} />
            <Route exact path="/profile" component={UserRecipes} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  signInFromLocalStorage: PropTypes.func.isRequired
};

export default connect(null, { signInFromLocalStorage })(App);
