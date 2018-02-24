import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './recipes/LandingPage';
import SignUp from '../components/signupPage/connectedComponent/SignUp';
import SignIn from './signinPage/connectedComponent/SignIn';
import UserRecipes from './recipes/userRecipes/UserRecipes';

const App = () => ((
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/profile" component={UserRecipes} />
      </Switch>
    </div>
  </Router>
));

export default App;
