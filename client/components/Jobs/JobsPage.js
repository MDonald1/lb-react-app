import React from 'react'

import JobsTableHead from './JobsTableHead'
import JobsTableBody from './JobsTableBody'

import agent from '../../agent'

import {isAuthenticated} from '../../authHelpers'

import {loadJobsPage, unloadJobs} from '../../actions'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const mapStateToProps = state => ({
  ...state.jobs,
  userId: state.common.userId,
  token: state.common.token
})

const filterJobs = (jobs,filterObj) => {
  if (filterObj && (filterObj.countries || filterObj.terms)) {

    let filteredJobs = jobs.filter(job => {
      let countries = filterObj.countries.toString()

      return !(countries.includes(job.client.country.toLowerCase()))
    })

    return filteredJobs
  } else return jobs
}
  

const mapDispatchToProps = dispatch => ({
  loadJobsPage: (payload) =>
    dispatch(loadJobsPage(payload)),
  unloadPage: () => 
    dispatch(unloadJobs())
})

class JobsPage extends React.Component {

  constructor() {
    super()
    this.state = {
      visibleJobs: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.filters && nextProps.jobs) {
      this.setState({
        visibleJobs: filterJobs(nextProps.jobs, nextProps.filters)
      })
    }
  }

  componentWillMount() {
    this.props.loadJobsPage(Promise.all([
      agent.jobs.get(this.props.userId, this.props.token), 
      agent.filterSettings.get(this.props.userId, this.props.token)
    ]))
  }

  componentWillUnmount() {
    this.props.unloadPage()
  }

  render() {

    const jobs = this.state.visibleJobs ? this.state.visibleJobs : []
    const jobsLoaded = this.props.jobsLoaded

    if (jobsLoaded) {
      if (jobs && jobs.length > 0) {
        return (
          <div className = "row">
            <table className="table tabled-striped">
              <JobsTableHead />
            </table>
            <JobsTableBody jobs = {jobs} />
          </div>
        )
      } else {
        return (
          <div className='text-center'>
            No jobs here!
          </div>
        )
      }
    } else {
      return (
        <h1 className="text-center">Loading jobs...</h1>
      )
    }
    
  }
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(isAuthenticated(JobsPage)))