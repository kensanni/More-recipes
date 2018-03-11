import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import LandingPage from './recipePages/LandingPage';
import AllRecipes from './recipePages/AllRecipes';
import UserRecipes from './recipePages/userRecipes/UserRecipes';
import SignUp from './signupPage/connectedComponent/SignUp';
import SignIn from './signinPage/connectedComponent/SignIn';
import RecipeDetailPageContainer from '../components/recipePages/userRecipes/RecipeDetailPageContainer';
import UserProfileContainer from '../components/recipePages/userProfile/UserProfileContainer';
import { signInFromLocalStorage } from '../actionController/signin';
import PageNotFound from '../components/pageNotFound/PageNotFound';

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
            <Route exact path="/profile" component={UserProfileContainer} />
            <Route exact path="/my-recipes" component={UserRecipes} />
            <Route exact path="/recipes/:recipeId" component={RecipeDetailPageContainer} />
            <Route component={PageNotFound} />
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
