import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link, Redirect} from 'react-router-dom'
import agent from '../agent'
import {notAuthenticated} from '../authHelpers'

import ListErrors from './Misc/ListErrors'

import {registerValueChanged, unloadRegisterForm, register} from '../actions'

const mapStatetoProps = (state) => ({
  ...state.register
})

const mapDispatchtoProps = (dispatch) => ({
  changeValue: (key, payload) =>
    dispatch(registerValueChanged(key, payload)),
  onUnload: () =>
    dispatch(unloadRegisterForm()),
  onSubmit: (username, email, password) =>
    dispatch(register(agent.Auth.register(username, email, password)))
})

class Register extends React.Component {
  constructor() {
    super()

    this.changeValue = e => this.props.changeValue(e.target.name, e.target.value)

    this.onSubmit = (username, email, password) => e => {
      e.preventDefault()
      this.props.onSubmit(username, email, password)
    }
  }

  componentWillUnmount() {
    this.props.onUnload()
  }


  render() {

    const username = this.props.username
    const password = this.props.password
    const email = this.props.email
    const error = this.props.errors

    if (this.props.registered) {
      return (
        <Redirect to="/login"/>
      )
    } else {
      return (
        <div className="auth-page">
  
          <div className="container">
            
            <div className="row">
              <div className="col-md-6 mx-auto col-xs-12">
  
                <h1 className="text-center">Register</h1>
  
                <br />
  
                <form onSubmit={this.onSubmit(username, email, password)}>
                  <fieldset>
  
                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={this.changeValue} />
                    </fieldset>
  
                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={this.changeValue} />
                    </fieldset>
  
                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={this.changeValue} />
                    </fieldset>
  
                    <button
                      className="btn btn-lg btn-primary pull-xs-right"
                      type="submit"
                      disabled={this.props.inProgress}>
                      Register
                    </button>
  
                  </fieldset>
                </form>
  
                <br />

                <ListErrors errors={error} />

                <br />

                <h3 className="text-center">
                  Already have an account? <Link to = "/login">Log in</Link>
                </h3>
  
              </div>
  
  
            </div>
  
          </div>
  
        </div>
      )
    }

    
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(notAuthenticated(Register)))

