const defaultState = {
  q: "",
  title: "",
  skills: [],
  job_type: "",
  duration: "",
  workload: "",
  job_status: "",
  form_loaded: false,
  in_progress: false,
  message: '',
  error: false
}


const searchForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'ASYNC_START':
      return {
        ...state,
        in_progress: true,
        message: "Saving..."
      }
    case 'DISPLAY_MESSAGE':
      if (action.subtype === 'search') {
        return {
          ...state,
          message: action.message
        }
      }
    case 'RETRIEVE_SETTINGS':
      if(action.subtype === "search") {
        return {
          ...state,
          q: action.error ? state.q : (action.payload.q || ""),
          title: action.error ? state.title : (action.payload.title || ""),
          skills: action.error ? state.skills : (action.payload.skills || []),
          job_type: action.error ? state.job_type : (action.payload.job_type || ""),
          duration: action.error ? state.duration : (action.payload.duration || ""),
          workload: action.error ? state.workload : (action.payload.workload || ""),
          job_status: action.error ? state.job_status : (action.payload.job_status || ""),
          form_loaded: action.error ? false : true,
          message: ''
        }
      } else {
        return state
      }
    case 'SEARCH_FORM_VALUE_CHANGED':
      return {
        ...state,
        [action.key]: action.payload
      }
    case 'SAVE_SETTINGS':
     if(action.subtype === 'search') {
      return {
        ...state,
        message: action.error ? "Error" : "Settings saved.",
        error: action.error ? true : false
      }
     }
    case 'CLEAR_SEARCH_FORM':
     return {
       ...defaultState,
       form_loaded: true
      }
    case 'SEARCH_PAGE_UNLOADED':
      return {}
    default:
      return state
  }
}

export default searchForm