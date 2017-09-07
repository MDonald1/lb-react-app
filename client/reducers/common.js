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
        token: action.payload.token || null,
        userId: action.payload.userId || null,
        appLoaded: true,
        loggedIn: action.payload.token ? true : false
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