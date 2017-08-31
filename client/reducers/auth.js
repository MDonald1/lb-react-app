const auth = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
    case 'LOGOUT':
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      }
    case 'ASYNC_START':
      if (action.subtype === 'LOGIN' || action.subtype === 'LOGOUT') {
        return {
          ...state,
          inProgress: true
        }
      }
    case 'LOGIN_FORM_VALUE_CHANGED':
      return {
        ...state,
        [action.key]: action.payload
      }
    case 'LOGIN_PAGE_UNLOADED':
      return {}
    default:
      return state
  }
}

export default auth