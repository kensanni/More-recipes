import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import LandingPage from './recipes/LandingPage';
import RecipeGrid from './recipes/RecipeGrid';
import UserRecipes from './recipes/userRecipes/UserRecipes';
import SignUp from './signupPage/connectedComponent/SignUp';
import SignIn from './signinPage/connectedComponent/SignIn';
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
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/recipes" component={RecipeGrid} />
            <Route path="/profile" component={UserRecipes} />
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
