const reducer = (
                state = {
                  isLoggedIn: false,
                  messages: '',
                  reqForRegister: false,
                  reqForLogin: false,
                  firstName: '',
                  email:'',
                  showModal :false
                },
                action) => {
  switch (action.type) {
    case 'REQUEST_REGISTRATION':
      return {
        ...state,
        reqForRegister: true }
    case 'REQUEST_LOGIN':
      return {
        ...state,
        reqForLogin: true }
    case 'SUCCESS_REGISTRATION':
      return {
        ...state,
        reqForRegister: false,
        messages:action.message }
    case 'SUCCESS_LOGIN':
      return {
        ...state,
        reqForLogin: false,
        messages:action.message,
        isLoggedIn: true,
        firstName: action.name,
        email:action.email
       }
    case 'FAILURE_REGISTRATION':
      return {
        ...state,
        reqForRegister: false,
        messages:  action.message }
    case 'FAILURE_LOGIN':
      return {
        ...state,
        reqForLogin: false,
        messages:action.message}
    case 'REQUEST_LOGOUT':
      return {
        ...state,
        isLoggedIn: false }
    case 'TOGGLE_MODAL':
      return {
        ...state,
        showModal: !state.showModal  }
    default:
      return state
  }
}

export default reducer
