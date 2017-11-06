import React from 'react'

import JobHeader from './JobHeader'
import JobBody from './JobBody'

function JobsTableBody(props) {
  if (props.jobs) {
    return (
      <div className="">
        {
          props.jobs.map((job) => {
            return (
              <div key={job.id}>
                <JobHeader job={job}/>
                <JobBody job={job}/>
              </div>
            )
          })
        }
      </div>
    )
  } else return null
}

export default JobsTableBody
