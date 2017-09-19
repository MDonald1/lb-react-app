import React from 'react'

function SkillsList(props) {
  if (props.skills && props.skills.length > 0) {
    return (
      <ul className="list-inline">
        <li className="list-inline-item">
          <h5>Expected Skills:</h5>
        </li>
        {
          props.skills.map((skill, index) => {
            return (
              <li className = "list-inline-item bg-secondary text-white skill-item" key={index}>
                {skill}
              </li>
            )
          })
        }
      </ul>
    )
  } else return null
}

function ExpertiseDisplay(props) {
  if (props.tier) {
    switch(props.tier) {
      case '1':
        return (
          <span>Entry</span>
        )
      case '2':
        return (
          <span>Intermediate</span>
        )
      case '3':
        return (
          <span>Expert</span>
        )
      default:
        return (
          <span>N/A</span>
        )
    }
  } else return null
}

function DetailLabel (props) {
  if (props.body) {
    return (
      <p><strong>{props.name}:</strong> {props.body}</p>
    )
  } else return null
}

function DisplayPaymentStatus (props) {
  if (props.status) {
    const statusClass = props.status === 'VERIFIED' ? 'text-success' : 'text-warning'
    const status = props.status === 'NOTVERIFIED' ? 'NOT VERIFIED' : props.status
    
    return (
      <strong className={statusClass}>
        {status}
      </strong>
    )
    
  } else {
    return (
      <strong className="text-warning">
        NONE
      </strong>
    )
  }
}

function JobBody(props) {
  if (props.job) {
    return (
      <div>
        <br />

        <h4>Details:</h4>

        <p>{props.job.snippet}</p>

        <SkillsList skills={props.job.skills}/>

        <div className="row">
          <div className='col-sm-6'>
            <p>Further Information</p>

            <p>
              <strong>Expertise Level:</strong>
              <ExpertiseDisplay tier={props.job.contractor_tier}/>
            </p>

            <DetailLabel name="Job Type" body={props.job.job_type}/>
            <DetailLabel name="Job Status" body={props.job.job_status}/>
            <DetailLabel name="Workload" body={props.job.workload}/>
            <DetailLabel name="Job Duration" body={props.job.duration}/>
          </div>

          <div className='col-sm-6'>
            <p>
              Payment Verification Status:
              <DisplayPaymentStatus status={props.job.payment_verification_status}/>
            </p>         

            

          </div>        

        </div>

      </div>
    )
  } else return null
}

export default JobBody
