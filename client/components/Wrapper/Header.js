import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

import agent from '../../agent'

import LogButtonState from './LogButtonState'

const mapStatetoProps = (state) => ({
  appName: state.common.appName,
  loggedIn: state.common.loggedIn
})

class Header extends React.Component {
  render() {
    const appName = this.props.appName
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
          <div className="container">
            <Link to='/' className="navbar-brand">{appName}</Link>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link to='search' className='nav-item nav-link'>Search</Link>
                <Link to='filter' className='nav-item nav-link'>Filter</Link>
                <LogButtonState loggedIn={this.props.loggedIn} />
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default connect(mapStatetoProps, () => ({}))(Header)