import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthorizationToken.js'
import fetch from 'isomorphic-fetch';

export const requestForLogin = (data) =>
    dispatch =>{
        dispatch(reqLogin())
        return fetch('/auth/facebook',{'mode': 'no-cors'})
             .then(response => {
               console.log(response);

             })
             .catch(
               (res) => {
                 console.log(res);
               }
             )
    }

const successLogin = (message) => ({
    type : 'SUCCESS_LOGIN',
    message
});
const reqLogin = () => ({
    type : 'REQUEST_LOGIN'
});
const failureLogin = (message) => ({
    type : 'FAILURE_LOGIN'
});
const reqLogOut = () => ({
    type : 'REQUEST_LOGOUT'
});
