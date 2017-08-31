import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import agent from '../agent'
import {notAuthenticated} from '../authHelpers'

import {loginValueChanged, logIn, unloadLoginForm} from '../actions'

const mapStatetoProps = (state) => ({
  ...state.auth
})

const mapDispatchtoProps = (dispatch) => ({
  onValueChanged: (key, value) => 
    dispatch(loginValueChanged(key, value)),
  onUsernameChanged: (value) =>
    dispatch(loginValueChanged('username', value)),
  onSubmit: (username, password) =>
    dispatch(logIn(agent.Auth.login(username, password))),
  onUnload: () =>
    dispatch(unloadLoginForm())
})

class Login extends React.Component {

  constructor() {
    super()
    this.changeValue = e => this.props.onValueChanged(e.target.name, e.target.value)
    this.onSubmit = (username, password) => e => {
      e.preventDefault()
      this.props.onSubmit(username, password)
    }
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    const username = this.props.username
    const password = this.props.password

      return (
        <div className="auth-page">

          <div className="container">
            
            <div className="row">
              <div className="col-6 col-offset-3 col-xs-12">

                <h1 className="text-center">Sign in</h1>

                <br />

                <form onSubmit={this.onSubmit(username, password)}>
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
                      Sign in
                    </button>

                  </fieldset>
                </form>

              </div>
            </div>

          </div>

        </div>
      )

    
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(notAuthenticated(Login)))