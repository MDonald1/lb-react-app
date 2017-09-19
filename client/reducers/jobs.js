const defaultState = {
  jobs: []
}

const jobs = (state = defaultState, action) => {
  switch(action.type) {
    case 'RETRIEVE_JOBS':
      return {
        ...state,
        jobs: action.error ? null : action.payload
      }
    case 'DELETE_JOB':
      if (!action.error) {
        return {
          ...state,
          jobs: state.jobs.filter(job => job.id !== action.id)
        }
      } else return state
    case 'UNLOAD_JOBS_PAGE':
      return {}
    default:
      return state
  }
}

export default jobs