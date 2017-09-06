import React from 'react'

class MessageDisplay extends React.Component {
  render() {
    return (
      <h4 className={this.props.error ? 'text-center text-danger' : 'text-center'}>{this.props.message}</h4>
    )
  }
}



export default MessageDisplay