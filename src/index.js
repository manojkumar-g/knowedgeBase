import React from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory,IndexRoute } from 'react-router'
import App from './containers/App.jsx'

render(
  <Router history={browserHistory}>
      <Route path="/" component={App}>
        
      </Route>
    </Router>
    ,document.getElementById('root'));
