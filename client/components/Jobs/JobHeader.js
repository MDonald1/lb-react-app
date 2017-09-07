import React from 'react'

function JobHeader(props) {
  if (props.job) return (
    <tr key={props.job.id}>
      <td>X</td>
      <td>{props.job.title}</td>
      <td>{props.job.subcategory2}</td>
      <td>
        {Numeral(props.job.budget).format('$0,0')}
      </td>
      <td>
        <Moment fromNow>{props.job.date_created}</Moment>
      </td>
    </tr>
  )
}

export default JobHeader
