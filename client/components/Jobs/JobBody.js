import React from 'react'
import Numeral from 'numeral'

import DOMPurify from 'dompurify'

import {
  jobTypeOptions,
  jobStatusOptions,
  durationOptions,
  workloadOptions
} from '../searchFormElements'

const JobLinkButton = (props) => {
  if (props.link) {
    return (
      <div className="text-center center-block client-rating">
        <a href={props.link}><button className="btn btn-info btn-lg job-link-button">Open Job In Upwork</button></a>
      </div>
    )
  } else return null
}

const SkillsList = (props) => {
  if (props.skills && props.skills.length > 0) {
    return (
      <ul className="list-inline pull-text ">
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

const ExpertiseDisplay = (props) => {
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

const LabelTitle = (props) => {
  if (props.title) {
    if (props.options) {

      let label = props.options.filter((option) => (option.value === props.title))

      label = (!label || label.length === 0) ? props.title : label[0].label

      return (
        <span>
          {label}
        </span>
      )
    } else return (
      <span>
        {props.title}
      </span>
    )
  } else return null
}

const DetailLabel = (props) => {
  if (props.body) {
    const options = props.options ? props.options : null

    return (
      <p>
        <span className="font-weight-bold">{props.name}: </span> 
        <LabelTitle title={props.body} options={options}/>
      </p>
    )
  } else return null
}

const DisplayPaymentStatus = (props) => {
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

const ClientRating = (props) => {
  if (props.reviews_count && props.feedback) {

    const word = (props.reviews_count > 1 || props.reviews_count < 1 ) ? "ratings" : "ratings" 

    return (
      <div className="text-center center-block client-rating">
        <h4>
          Client Rating: <span className="font-weight-bold">{Numeral(props.feedback).format('0.00')}</span>
        </h4>
        <h5>from {props.reviews_count} {word}</h5>
      </div>
    )
  } else return null
}

const LineBreak = () => (<div className = "line-break center-block"></div>)

function JobBody(props) {
  if (props.job) {

    const job = props.job
    const client = job.client

    const dirtySnippet = job.snippet || ""
    const cleanSnippet = DOMPurify.sanitize(dirtySnippet)

    return (
      <div className="job-body">
        <br />

        <JobLinkButton link={job.url} />

        <br />

        <h4 className="pull-text">Details:</h4>

        <div className="text-justify snippet-text" dangerouslySetInnerHTML={
          ({__html: cleanSnippet})
        }></div>

        <SkillsList skills={job.skills}/>

        <br />

        <LineBreak />

        <br />

        <div className="row pull-text justify-content-center">
          <div className='col-10 col-md-6 info-panel'>
            <h4>Further Information:</h4>

            <p>
              <strong>Expertise Level:</strong>
              <ExpertiseDisplay tier={job.contractor_tier}/>
            </p>

            <DetailLabel name="Job Type" body={job.job_type} options={jobTypeOptions}/>
            <DetailLabel name="Job Status" body={job.job_status} options={jobStatusOptions}/>
            <DetailLabel name="Workload" body={job.workload} options={workloadOptions}/>
            <DetailLabel name="Job Duration" body={job.duration} options={durationOptions}/>

            <div className="d-block d-md-none">
              <LineBreak/>

              <br />
            </div>
          </div>

          <div className='col-10 col-md-6 info-panel'>
            <h4>Client Information:</h4>

            <p>
              Payment Verification Status: <DisplayPaymentStatus status={client.payment_verification_status}/>
            </p>         


            <DetailLabel name="Country of Origin" body={client.country}/>
            <DetailLabel name="No. of Past Hires" body={client.past_hires}/>
            <DetailLabel name="No. of Jobs Posted by Client" body={client.jobs_posted}/>

            <div className="d-block d-md-none">
              <LineBreak/>

              <br />
            </div>

          </div>        

        </div>

        <ClientRating reviews_count={client.reviews_count} feedback={client.feedback}/>

        <br />

      </div>
    )
  } else return null
}

export default JobBody
