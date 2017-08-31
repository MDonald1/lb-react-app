export const filterValueChanged = (key, value) => ({
  type: 'FILTER_FORM_VALUE_CHANGED',
  payload: {
    key: key,
    value: value
  }
})

export const submitFilterForm = (payload) => ({
  type: 'FILTER_FORM_SUBMIT',
  payload
})

export const unloadFilter = () => ({
  type: 'FILTER_FORM_UNLOAD'
})

export const clearFilterForm = () => ({
  type: 'CLEAR_FILTER_FORM'
})