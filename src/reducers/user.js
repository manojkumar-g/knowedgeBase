const initialState = {
  userName:'guest',
  isLoggedIn:false,
  requestForLogin:false
}

const reducer = (state = initialState,action) =>{
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...state,
        requestForLogin: true }
    case 'SUCCESS_LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        firstName: action.name }
    case 'FAILURE_LOGIN':
        return {
          ...state,
          requestForLogin: false}
    case 'REQUEST_LOGOUT':
      return {
        ...state,
        isLoggedIn: false }
    default:
      return state
  }
}


export default reducer
