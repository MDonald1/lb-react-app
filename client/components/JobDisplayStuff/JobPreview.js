import React from 'react'

const JobPreview = (props) => {
  if (props.job) {
    return (
      <div>
        <h1>Job</h1>
      </div>
    )
  } else {
    return (
      <div>
          no job here
      </div>
    )
  }
}

export default JobPreview