import React from 'react'
import JobList from './JobDisplayStuff/JobList'
import Moment from 'react-moment'

import agent from '../agent'

import {isAuthenticated} from '../authHelpers'

import {getJobs, unloadJobs} from '../actions'

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

class Jobs extends React.Component {

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
        <div>
          <table className="table tabled-striped">
            <thead>
              <tr>
                <th></th>
                <th>Job Title</th>
                <th>Subcategory</th>
                <th>Budget</th>
                <th>Posted</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                jobs.map((job) => {
                  return (
                    <tr>
                      <td>X</td>
                      <td>{job.title}</td>
                      <td>{job.subcategory2}</td>
                      <td>{job.budget}</td>
                      <td>
                        <Moment fromNow>{job.date_created}</Moment>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      )
    } else {
      return (
        <div className='text-center'>
          No jobs here!
          {jobs}
        </div>
      )
    }
    
  }
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(isAuthenticated(Jobs)))