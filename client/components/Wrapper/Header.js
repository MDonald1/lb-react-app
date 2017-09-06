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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link to='/' className="navbar-brand">{appName}</Link>
            <div className="collapse navbar-collapse">
                <LogButtonState loggedIn={this.props.loggedIn} />
            </div>
          </div>
        </nav>
    )
  }
}

export default connect(mapStatetoProps, () => ({}))(Header)