import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import history from './history'
import App from './app';
import { store } from './components/store/index';
// establishes socket connection

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  // <div />,
  document.getElementById('app')
);
