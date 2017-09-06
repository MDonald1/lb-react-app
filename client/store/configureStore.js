import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import auth from '../reducers/auth'
import common from '../reducers/common'
import filterForm from '../reducers/filterForm'
import searchForm from '../reducers/searchForm'
import jobs from '../reducers/jobs'
import register from '../reducers/register'

import {
	promiseMiddleware,
	localStorageMiddleware
} from '../middleware/middleware'

const reducer = combineReducers({
  searchForm,
  filterForm,
  common,
	auth,
	jobs,
	register
})

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  	const store = createStore(
			reducer,
			/* preloadedState, */
			composeEnhancers(middleware)
		);
  	return store;
}