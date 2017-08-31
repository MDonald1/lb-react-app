import React from 'react'

/*const MessageDisplay = (props) => (
  <h4 className={props.error ? 'text-center text-danger' : 'text-center'}>{props.message}</h4>
)*/

class MessageDisplay extends React.Component {
  render() {
    return (
      <h4 className={this.props.error ? 'text-center text-danger' : 'text-center'}>{this.props.message}</h4>
    )
  }
}



export default MessageDisplay