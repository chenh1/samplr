import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import MainPage from './components/ecosystems/MainPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MainPage}/>
  </Route>
);
