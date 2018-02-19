import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './recipes/LandingPage';
import SignUp from '../components/signupPage/connectedComponent/SignUp';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
