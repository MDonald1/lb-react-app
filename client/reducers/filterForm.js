const defaultState = {
  terms: [],
  countries: [],
  form_loaded: false,
  in_progress: false,
  message: '',
  error: false
}

const filterForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'ASYNC_START':
      return {
        ...state,
        in_progress: true,
        message: 'Saving...'
      }
    case 'DISPLAY_MESSAGE':
      if (action.subtype === 'filter') {
        return {
          ...state,
          message: action.message
        }
      }
    case 'RETRIEVE_SETTINGS':
      if(action.subtype === "filter") {
        return {
          ...state,
          terms: action.error ? state.terms : (action.payload.terms || []),
          countries: action.error ? state.countries : (action.payload.countries || {}),
          form_loaded: action.error ? false : true,
          message: ''
        }
      } else {
        return state
      }
    case 'FILTER_FORM_VALUE_CHANGED':
      return {
        ...state,
        [action.payload.key]: action.payload.value
      }
    case 'SAVE_SETTINGS':
      if(action.subtype === 'filter') {
        return {
          ...state,
          message: action.error ? "Error" : "Settings saved.",
          error: action.error ? true : false
        }
      }
    case 'CLEAR_FILTER_FORM':
      return {
        ...defaultState,
        form_loaded: true
      }
    case 'FILTER_FORM_UNLOAD':
      return {}
    default:
      return state
  }
}

export default filterForm