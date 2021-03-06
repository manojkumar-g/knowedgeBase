import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import { Router, Route, browserHistory,IndexRoute } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './containers/App.jsx'
import NewStory from './components/writeStory.jsx'
import store from './configureStore'
import Gallary from './components/gallary.jsx'
import ShowStory from './components/showStory.jsx'
import requireAuth from './utils/requireAuth.jsx'

injectTapEventPlugin()

render(
  <Provider store = {store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component = {Gallary}/>
            <Route path = '/new' component = {requireAuth(NewStory)}/>
            <Route path = '/read/:id' component = {ShowStory}/>
        </Route>
    </Router>
    </MuiThemeProvider>
  </Provider>
    ,document.getElementById('root'));
