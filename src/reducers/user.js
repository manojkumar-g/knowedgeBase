const reducer = (
                state = {
                  isLoggedIn: false,
                  messages: '',
                  requestForRegister: false,
                  requestForLogin: true,
                  firstName: '',
                  email:'',
                  showModal :false
                },
                action) => {
  switch (action.type) {
    case 'REQUEST_REGISTRATION':
      return {
        ...state,
        requestForRegister: true }
    case 'REQUEST_LOGIN':
      return {
        ...state,
        requestForLogin: true }
    case 'SUCCESS_REGISTRATION':
      return {
        ...state,
        requestForRegister: false,
        messages:action.message }
    case 'SUCCESS_LOGIN':
      return {
        ...state,
        requestForRegister: false,
        messages:action.message,
        isLoggedIn: true,
        firstName: action.name,
        email:action.email
       }
    case 'FAILURE_REGISTRATION':
      return {
        ...state,
        requestForRegister: false,
        messages:  action.message }
    case 'FAILURE_LOGIN':
      return {
        ...state,
        requestForLogin: false,
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
