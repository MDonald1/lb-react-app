import React from 'react'
import TagsInput from 'react-tagsinput'
import MessageDisplay from './Misc/MessageDisplay'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {isAuthenticated} from '../authHelpers'

import agent from '../agent'

import {filterValueChanged, getSettings, saveSettings, clearFilterForm, unloadFilter} from '../actions'

const mapStatetoProps = (state) => ({
  ...state.filterForm,
  userId: state.common.userId,
  token: state.common.token
})

const mapDispatchtoProps = (dispatch) => ({
  loadFilter: (payload) => 
    dispatch(getSettings('filter', payload)),
  onValueChanged: (key,value) =>
    dispatch(
      filterValueChanged(key,value)
    ),
  onSubmit: (payload) =>
    dispatch(
      saveSettings('filter', payload)
    ),
  onClear: () =>
    dispatch(clearFilterForm()),
  onUnload: () =>
    dispatch(unloadFilter())
})

class Filter extends React.Component {
  constructor() {
    super()
    this.changeTerms = (tags) => this.props.onValueChanged("terms", tags)
    this.changeCountries = (tags) => this.props.onValueChanged("countries", tags)

    this.onClear = (e) => {
      e.preventDefault()
      this.props.onClear()
    }

    this.onSubmit = (query) => e => {
      e.preventDefault()
      this.props.onSubmit(
        agent.filterSettings.put(
          this.props.userId,
          this.props.token,
          query
        )
      )
    }
  }

  componentWillMount() {
    if(this.props.userId && this.props.token) {
      this.props.loadFilter(
        agent.filterSettings.get(this.props.userId, this.props.token)
      )
    }
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {

    const query = {
      terms: this.props.terms ? this.props.terms : [],
      countries: this.props.countries ? this.props.countries : []
    }

    const message = this.props.message
    const error = this.props.error

    if(this.props.form_loaded) {
      return (
        <div className='container'>
          <div className="row">
            
            <div className="col-md-6 mx-auto col-xs-12">
  
              <h1 className="text-center">Filter</h1>
  
              <form onSubmit={this.onSubmit(query)}>
                <fieldset>
  
                  <fieldset className="form-input">
                    <h4>Terms to filter (CSV)</h4>
                    <TagsInput
                      className="form-control"
                      name="terms"
                      value={query.terms}
                      onChange={this.changeTerms}
                    />
                  </fieldset>
  
                  <br />
  
                  <fieldset className="form-input">
                    <h4>Countries to filter (CSV)</h4>
                    <TagsInput
                      className="form-control"
                      name="countries"
                      value={query.countries}
                      onChange={this.changeCountries}
                    />
                  </fieldset>
                  <br />

                  <MessageDisplay message={message} error={error} />

                    <div className="float-right">
                    
                      <button
                      className="btn btn-lg btn-warning"
                      onClick={this.onClear}>
                        Clear
                      </button>
      
                      <button
                      className="btn btn-lg btn-primary"
                      type="submit">
                        Save
                      </button>
                      
                  </div>
  
                </fieldset>
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

export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(isAuthenticated(Filter)))