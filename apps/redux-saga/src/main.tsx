import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/App';
import { store } from './app/store/store';

import { Provider as StoreProvider } from 'react-redux';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://rem-rest-api.herokuapp.com/api';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
