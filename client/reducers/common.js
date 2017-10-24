const defaultState = {
  appName: 'Job Search',
  jobs: null,
  loggedIn: false
}

const common = (state = defaultState, action) => {
  switch (action.type) {
    case 'APP_LOAD':
      return {
        ...state,
        token: action.error ? null : action.token,
        userId: action.error ? null : action.userId,
        appLoaded: true,
        loggedIn: action.error ? false : true
      }
    case 'LOGIN':
      return {
        ...state,
        token: action.error ? null : action.payload.id,
        userId: action.error ? null : action.payload.userId,
        loggedIn: action.error ? false : true,
        errors: action.error ? action.payload.errors : null
      }
    case 'LOGOUT':
      return {
        ...state,
        token: action.error ? state.token : null,
        userId: action.error ? state.userId : null,
        loggedIn: action.error ? true : false
      }
    default:
      return state
  }
}

export default common