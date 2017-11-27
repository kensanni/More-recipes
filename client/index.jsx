import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './public/styles/styles.scss';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
