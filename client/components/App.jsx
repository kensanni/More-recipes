import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './recipes/HomePage';


const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
