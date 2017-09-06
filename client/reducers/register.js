const defaultState = {
  username: "",
  email: "",
  password: "",
  registered: false
}

const register = (state = defaultState, action) => {
  switch (action.type) {
    case 'REGISTER':  
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload : null,
        registered: action.error ? false : true
      }
    case 'REGISTER_VALUE_CHANGED':
      return {
        ...state,
        [action.key]: action.payload
      }
    case 'REGISTER_PAGE_UNLOADED':
      return {}
    default:
      return state
  }
}

export default register