import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import agent from '../../agent'

import {logOut} from '../../actions'

const mapStatetoProps = (state) => ({
  token: state.common.token,
  inProgress: state.auth.inProgress
})

const mapDispatchtoProps = (dispatch) => ({
  loggingOut: (token) => 
    dispatch(logOut(agent.Auth.logout(token)))
})

class LogButtonState extends React.Component {

  constructor() {
    super()
    this.logOut = (token) => this.props.loggingOut(token)
  }

  render() {

    const token = this.props.token
    const linkDisabled = this.props.inProgress ? 'disabled' : ''

    if(!this.props.loggedIn) {
      return (
        <ul className="navbar-nav">
          <li className="nav-item pull-right">
            <Link to='/login' className='nav-link'>Log in</Link>
          </li>
          <li className="nav-item pull-right">
            <Link to='/register' className='nav-link'>Register</Link>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to='search' className='nav-link'>Search</Link>
          </li>
          <li className="nav-item">
            <Link to='filter' className='nav-link'>Filter</Link>
          </li>
          <li className="nav-item pull-right">
            <a href="#" className={`nav-link ${linkDisabled}`} onClick={() => this.logOut(token)}>Log out</a>
          </li>
        </ul>
      )
    }
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(LogButtonState)