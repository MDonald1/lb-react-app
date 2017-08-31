export const getSettings = (subtype, payload) => ({
    type: 'RETRIEVE_SETTINGS',
    subtype,
    payload
})

export const saveSettings = (subtype, payload) => ({
    type: 'SAVE_SETTINGS',
    subtype,
    payload
})