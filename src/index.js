import React from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory,IndexRoute } from 'react-router'
import App from './containers/App.jsx'
import NewStory from './components/writeStory.jsx'

render(
  <Router history={browserHistory}>
      <Route path="/" component={App}>
          <Route path = '/new' component = {NewStory}/>
      </Route>
    </Router>
    ,document.getElementById('root'));
