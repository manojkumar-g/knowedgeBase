import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import { Router, Route, browserHistory,IndexRoute } from 'react-router'
import App from './containers/App.jsx'
import NewStory from './components/writeStory.jsx'
import store from './configureStore'

render(
  <Provider store = {store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path = '/new' component = {NewStory}/>
        </Route>
    </Router>
  </Provider>
    ,document.getElementById('root'));
