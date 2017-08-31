import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'

import configureStore from './store/configureStore';
const store = configureStore();

import 'bootstrap/dist/css/bootstrap.css'
import 'react-select/dist/react-select.css'
import 'react-tagsinput/react-tagsinput.css'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
  	<Router>
      <App>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);