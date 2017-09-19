import React from 'react'

import JobHeader from './JobHeader'
import JobBody from './JobBody'

function JobsTableBody(props) {
  if (props.jobs) {
    return (
      <tbody>
        {
          props.jobs.map((job) => {
            return (
              <div key={job.id} className="mr-auto job-body">
                <JobHeader job={job}/>
                <JobBody job={job}/>
              </div>
            )
          })
        }
      </tbody>
    )
  } else return null
}

export default JobsTableBody
