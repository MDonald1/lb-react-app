import agent from '../agent'
import {getSettings} from '../actions'

const promiseMiddleware = store => next => action => {
  if(isPromise(action.payload)) {
    store.dispatch({
      type: 'ASYNC_START',
      subtype: action.type
    })
    action.payload.then(
      res => {
        action.payload = res
        store.dispatch(action)
      },
      err => {
        action.error = true
        action.payload = err.error.messages
        store.dispatch(action)
      }
    )

    return
  }

  next(action)
}

function isPromise(v) {
  return v && typeof v.then ==='function'
}

const localStorageMiddleware = store => next => action => {
  if(action.type === 'LOGIN') {
    if (!action.error) {
      window.localStorage.setItem('token', action.payload.id)
      window.localStorage.setItem('userId', action.payload.userId)
    }
  } else if (action.type === 'LOGOUT') {
    if (!action.error) {
      window.localStorage.setItem('token', '')
      window.localStorage.setItem('userId', '')
    }
  }

  next(action)
}

export {
  promiseMiddleware,
  localStorageMiddleware
}