import React, { Component } from 'react'
import ErrorMessage from './ErrorMessage'

export default class ListErrors extends Component {
  render() {
    if (this.props.errors) {
      return (
        <div>
          {
            this.props.errors.map(error => {
              return (
                <ErrorMessage error = {error}/>
              )
            })
          }          
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}