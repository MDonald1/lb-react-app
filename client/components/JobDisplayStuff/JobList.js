import React from 'react'
import JobPreview from './JobPreview'

const JobList = props => {
  if(props.jobs) {
    return (
      <div>
        jobs here
        {
          props.jobs.map(job => {
            <JobPreview job={job} />
          })
        }
      </div>
    )
  } else {
    return (
      <div>
        no jobs here
      </div>
    )
  }
}

export default JobList