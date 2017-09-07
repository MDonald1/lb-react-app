import React from 'react'

const failText = 'login failed'

class ErrorMessage extends React.Component {

  evaluateOutput(string) {
    switch(string) {
      case (failText):
        return "Invalid username or password."
      default:
        return null
    }
  }

  render() {
    

    return (
      <h4 className='text-center text-danger'></h4>
    )
  }
}

export default ErrorMessage
