export const onLoad = (token, userId) => ({
  type: 'APP_LOAD',
  payload: {
    token: token,
    userId: userId
  }
})

export const loginValueChanged = (key, payload) => ({
  type: 'LOGIN_FORM_VALUE_CHANGED',
  key: key,
  payload
})

export const registerValueChanged = (key, payload) => ({
  type: 'REGISTER_VALUE_CHANGED',
  key: key,
  payload
})

export const unloadLoginForm = () => ({
  type: 'LOGIN_PAGE_UNLOADED'
})

export const unloadRegisterForm = () => ({
  type: 'REGISTER_PAGE_UNLOADED'
})

export const logIn = (payload) => ({
  type: 'LOGIN',
  payload
})

export const register = (payload) => ({
  type: "REGISTER",
  payload
})

export const logOut = (payload) => ({
  type: 'LOGOUT',
  payload: payload
})

export const startAsync = (subtype) => ({
  type: 'ASYNC_START',
  subtype
})

export const displayMessage = (subtype, message) => ({
  type: 'DISPLAY_MESSAGE',
  subtype,
  message
})

