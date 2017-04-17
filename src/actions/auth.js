import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthorizationToken.js'
import fetch from 'isomorphic-fetch';
import jwtDecode from 'jwt-decode'
import isEmpty from 'lodash/isEmpty'

export const requestForRegistration = (data) =>
    dispatch =>{
        dispatch(reqRegistration())
        return axios.post('/signup',data)
             .then(response => {
               dispatch(toggleModal())
               response.status === 200 ? dispatch(successRegistration()) : dispatch(failureRegistration())
             })
             .catch(
               ({response:{data}}) => {
                 dispatch(failureRegistration(data.message))
               }
             )
    }

const successRegistration = () => ({
    type : 'SUCCESS_REGISTRATION'
});
const reqRegistration = () => ({
    type : 'REQUEST_REGISTRATION'
});
const failureRegistration = (message) => ({
    type : 'FAILURE_REGISTRATION',
    message
});
export const requestForLogin = (data) =>
    dispatch =>{
        dispatch(reqLogin())
        return axios.post('/login',data)
             .then(response => {
               let token = response.data.token;
               localStorage.setItem('token',token);
               let userData = jwtDecode(token).data
               setAuthorizationToken(token)
               dispatch(toggleModal())
               response.status === 200 ? dispatch(successLogin(userData.name,userData.email)) : dispatch(failureLogin(response.data.message))
             })
             .catch(
               ({response:{data}}) => {
                 dispatch(failureLogin(data.message))
               }
             )
    }
export const setFromToken = (token) =>
  dispatch => {
    try{
      let userData = jwtDecode(token).data
      setAuthorizationToken(typeof userData)
      console.log(userData);
      if(!isEmpty(userData))
         return dispatch(successLogin(userData.name,userData.email))
       return dispatch(failureLogin(userData.data.message))
    }
    catch(err){
      return dispatch(failureLogin(err.message))
    }


  }

const successLogin = (name,email) => ({
    type : 'SUCCESS_LOGIN',
    name,
    email
});
const reqLogin = () => ({
    type : 'REQUEST_LOGIN'
});
const failureLogin = (message) => ({
    type : 'FAILURE_LOGIN',
    message
});
export const reqLogOut = () =>
  dispatch => {
    setAuthorizationToken()
    localStorage.removeItem('token')
    dispatch(LogOut())
  }
const LogOut = () => ({
    type : 'REQUEST_LOGOUT'
});

export const toggleModal = () => ({
    type : 'TOGGLE_MODAL'
});
