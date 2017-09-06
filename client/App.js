import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

import Search from './components/Search'
import Jobs from './components/Jobs'
import Filter from './components/Filter'
import Login from './components/Login'
import Register from './components/Register'

import Header from './components/Wrapper/Header'

import {isAuthenticated, notAuthenticated} from './authHelpers'

import {onLoad} from './actions'

import agent from './agent'

const mapDispatchtoProps = dispatch => ({
  onLoad: (token, userId) =>
    dispatch(
      onLoad(token, userId)
    )
})

class App extends Component {

  componentWillMount() {
    const token = window.localStorage.getItem('token')
    const userId = window.localStorage.getItem('userId')

    this.props.onLoad(token, userId)
  }

  render() {
    return (
      <div className="container-fluid">
        <Header />

        <br />
        <div className="container">
          <Switch>
            <Route exact path ='/' component={Jobs}/>
            <Route path ='/search' component={Search}/>
            <Route path ='/filter' component={Filter}/>
            <Route path ='/login' component={Login}/>
            <Route path ='/register' component={Register}/>
          </Switch>
        </div>
        
      </div>
    )
  }
}

export default withRouter(connect(() => ({}), mapDispatchtoProps)(App));
