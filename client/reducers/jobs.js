const defaultState = {
  jobs: [],
  filters: {},
  jobsLoaded: false
}

const jobs = (state = defaultState, action) => {
  switch(action.type) {
    case 'JOBS_PAGE_LOADED':
      return {
        ...state,
        jobs: action.error ? null : action.payload[0],
        filters: action.error ? null : action.payload[1],
        jobsLoaded: action.error ? false : true
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