export const loadJobsPage = (payload) => ({
  type: "JOBS_PAGE_LOADED",
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