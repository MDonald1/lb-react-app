import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'

const locationHelper = locationHelperBuilder({})

export const isAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: (state) => state.common.loggedIn,
  wrapperDisplayName: 'isAuthenticated'
})

export const notAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) => 
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false,
  authenticatedSelector: (state) => !(state.common.loggedIn),
  wrapperDisplayName: 'notAuthenticated'
})