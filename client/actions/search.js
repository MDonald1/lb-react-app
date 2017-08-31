export const searchValueChanged =(key, payload) => ({
  type: 'SEARCH_FORM_VALUE_CHANGED',
  key: key,
  payload
})

export const submitSearchForm = (payload) => ({
  type: 'SEARCH_FORM_SUBMIT',
  payload
})

export const unloadSearch = () =>({
  type: 'SEARCH_PAGE_UNLOADED'
})

export const clearSearchForm = () => ({
  type: 'CLEAR_SEARCH_FORM'
})