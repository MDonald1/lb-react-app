import React from 'react'

import Moment from 'react-moment'
import Numeral from 'numeral'
import JobHeader from './JobHeader'

function JobsTableBody(props) {
  if (props.jobs) {
    return (
      <tbody>
        {
          props.jobs.map((job) => {
            return (
              <JobHeader job={job}/>
            )
          })
        }
      </tbody>
    )
  } else return null
}

export default JobsTableBody
