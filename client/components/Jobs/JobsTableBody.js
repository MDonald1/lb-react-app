import React from 'react'

import JobHeader from './JobHeader'
import JobBody from './JobBody'

function JobsTableBody(props) {
  if (props.jobs) {
    return (
      <div className="col-10 mr-auto">
        {
          props.jobs.map((job) => {
            return (
              <div key={job.id} className="job-body">
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
