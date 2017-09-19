import React from 'react'

import JobsTableHead from './JobsTableHead'
import JobsTableBody from './JobsTableBody'

import Moment from 'react-moment'

import agent from '../../agent'

import {isAuthenticated} from '../../authHelpers'

import {getJobs, unloadJobs} from '../../actions'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const mapStateToProps = state => ({
  ...state.jobs,
  userId: state.common.userId,
  token: state.common.token
})

const mapDispatchToProps = dispatch => ({
  getJobs: (payload) =>
    dispatch(getJobs(payload)),
  unloadPage: () => 
    dispatch(unloadJobs())
})

class JobsPage extends React.Component {

  componentWillMount() {
    this.props.getJobs(agent.jobs.get(this.props.userId, this.props.token))
  }

  componentWillUnmount() {
    this.props.unloadPage()
  }

  render() {

    const jobs = this.props.jobs ? this.props.jobs : []

    if (jobs && jobs.length > 0) {
      return (
        <div className = "row">
          <table className="table tabled-striped">
            <JobsTableHead />
            <JobsTableBody jobs = {jobs} />
          </table>
        </div>
      )
    } else {
      return (
        <div className='text-center'>
          No jobs here!
        </div>
      )
    }
    
  }
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(isAuthenticated(JobsPage)))