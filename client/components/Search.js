import React from 'react'
import Select from 'react-select'
import {
  jobStatusOptions,
  jobTypeOptions,
  durationOptions,
  workloadOptions
} from './searchFormElements'
import TagsInput from 'react-tagsinput'
import MessageDisplay from './Misc/MessageDisplay'

import {connect} from 'react-redux'

import {withRouter} from 'react-router-dom'

import {isAuthenticated} from '../authHelpers'

import agent from '../agent'

import {
  displayMessage,
  getSettings, 
  saveSettings, 
  searchValueChanged, 
  clearSearchForm, 
  unloadSearch} from '../actions'


const mapStatetoProps = (state) => ({
  ...state.searchForm,
  token: state.common.token,
  userId: state.common.userId
})

const mapDispatchtoProps = (dispatch) => ({
  displayMessage: (message) =>
    dispatch(displayMessage('search', message)),
  loadSearch: (payload) =>
    dispatch(getSettings('search', payload)),
  onValueChanged: (key, value) =>
    dispatch(searchValueChanged(key, value)),
  onSubmit: (payload) =>
    dispatch(saveSettings('search', payload)),
  onClear: () =>
    dispatch(clearSearchForm()),
  onUnload: () => {
    dispatch(unloadSearch())
  }
})

class Search extends React.Component {
  constructor() {
    super()

    this.displayMessage = (message) => this.props.displayMessage(message)

    this.changeValue = e => this.props.onValueChanged(e.target.name, e.target.value)
    this.changeJobTypeValue = (e) => this.props.onValueChanged("job_type", this.eValue(e))    
    this.changeJobStatusValue = (e) => this.props.onValueChanged("job_status", this.eValue(e))
    this.changeDurationValue = (e) => this.props.onValueChanged("duration", this.eValue(e))
    this.changeWorkloadValue = (e) => this.props.onValueChanged("workload", this.eValue(e))
    
    this.onSubmit = (query) => e => {
      e.preventDefault()
      this.props.onSubmit(agent.searchSettings.put(
        this.props.userId,
        this.props.token,
        query
      ))
    }

    this.clearSettings = (e) => {
      e.preventDefault()
      this.props.onClear()
    }

    this.changeTags = (tags) => this.props.onValueChanged("skills", tags)

    this.eValue = (e) => e ? e.value : ""
  }

  componentWillMount() {
    if(this.props.userId && this.props.token) {
      this.props.loadSearch(
        agent.searchSettings.get(this.props.userId, this.props.token)
      )
    }
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {

    const query = {
      q: this.props.q,
      title: this.props.title,
      skills: this.props.skills ? this.props.skills : [],
      job_type: this.props.job_type,
      duration: this.props.duration,
      workload: this.props.workload,
      job_status: this.props.job_status
    }

    const inProgress = this.props.inProgress

    const message = this.props.message
    const error = this.props.error


    if (this.props.form_loaded) {
      return (
        <div className = "container">
          <div className="row">
            
            <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-center">Job Search</h1>

              <form onSubmit={this.onSubmit(query)}>

                <fieldset>

                  <fieldset className="form-input">
                    <h4>
                      Query:
                    </h4>

                    <input
                    className="input-field" 
                    type="text"
                    name="q"
                    placeholder="Query"
                    value={query.q}
                    onChange={this.changeValue}/>

                  </fieldset>

                  <br/>

                  <fieldset className="form-input">
                    <h4>
                      Title:
                    </h4>

                    <input 
                    className="input-field"
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={query.title}
                    onChange={this.changeValue}/>

                  </fieldset>
                  
                  <br/>
                  <fieldset className="form-input">
                    <h4>
                      Skills:
                    </h4>

                    <TagsInput
                      name="skills"
                      value={query.skills}
                      onChange={this.changeTags}
                      inputProps={{
                        placeholder: "Add skill"
                      }}                        
                    />
                  </fieldset>
                  
                  <br/>
                  <fieldset className="form-input">
                    <h4>
                      Job Type:
                    </h4>

                    <Select
                      name="job_type"
                      value={query.job_type}
                      options={jobTypeOptions}
                      onChange={this.changeJobTypeValue}
                    />

                  </fieldset>
                  
                  <br/>
                  <fieldset className="form-input">
                    <h4>
                      Job Duration:
                    </h4>

                    <Select
                      name="duration"
                      value={query.duration}
                      options={durationOptions}
                      onChange={this.changeDurationValue}
                    />

                  </fieldset>
                  
                  <br/>
                  <fieldset className="form-input">
                    <h4>
                      Workload:
                    </h4>
                    <Select
                      name="workload"
                      value={query.workload}
                      options={workloadOptions}
                      onChange={this.changeWorkloadValue}
                    />


                  </fieldset>
                  
                  <br/>
                  <fieldset className="form-input">
                    <h4>
                      Job Status:
                    </h4>

                    <Select
                      name="job_status"
                      value={query.job_status}
                      options={jobStatusOptions}
                      onChange={this.changeJobStatusValue}
                    />

                  </fieldset>
                  
                  <br/>


                </fieldset>

                <br />

                <MessageDisplay message={message} error={error} />

                <br />
                
                <div className="float-right">
                
                  <button
                  className="btn btn-lg btn-warning"
                  onClick={this.clearSettings}
                  disabled={inProgress}>
                    Clear
                  </button>

                  <button
                  className="btn btn-lg btn-primary"
                  type="submit"
                  disabled={inProgress}>
                    Save
                  </button>

                </div>
              </form>
            </div>

          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h3 className='text-center'>Loading...</h3>
        </div>
      )
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(isAuthenticated(Search)))

