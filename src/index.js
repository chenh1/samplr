/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import Root from './components/Root';
import AppProvider from './client/Provider';
import { client } from './reducers/index'
import configureStore from './store/configureStore';
require('./favicon.ico'); 
import './styles/styles.scss'; 
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

render(
  <AppContainer>
    <AppProvider store={store} client={client}>
      <Root store={store} history={history} />
    </AppProvider>
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <AppProvider store={store} client={client}>
          <NewRoot store={store} history={history} />
        </AppProvider>
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
