import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import {setFromToken} from './actions/auth'

// here we are configuring the redux store using reducers and we are applying middlewares like thunk for async actions and loggerMiddleware
//debugging
const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

let token = localStorage.getItem('token')
if(token){
  store.dispatch(setFromToken(token))
}



export default store;
