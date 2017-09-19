export const getJobs = (payload) => ({
  type: "RETRIEVE_JOBS",
  payload
})

export const unloadJobs = () => ({
  type: "UNLOAD_JOBS_PAGE"
})

export const deleteJob = (id , payload) => ({
  type: 'DELETE_JOB',
  id,
  payload
})