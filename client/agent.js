import _superagent from 'superagent'
import superagentPromise from 'superagent-promise'

const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT = "http://localhost:3000/api/"

const responseBody = res => res.body

const filter = (object) => (`?filter=${JSON.stringify(object)}`)

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).then(responseBody),
  post: (url, body) => 
    superagent.post(`${API_ROOT}${url}`, body).then(responseBody),
  delete: (url) =>
    superagent.del(`${API_ROOT}${url}`).then(responseBody),
  getAuth: (url, token) => 
    superagent
    .get(`${API_ROOT}${url}`)
    .set('Authorization', token)
    .end()
    .then(responseBody),
  postAuth: (url, token, body) =>
    superagent
    .post(`${API_ROOT}${url}`, body)
    .set('Authorization', token)
    .end()
    .then(responseBody),
  putAuth: (url, token, body) =>
    superagent
    .put(`${API_ROOT}${url}`, body)
    .set('Authorization', token)
    .end()
    .then(responseBody),
  deleteAuth: (url, token) =>
    superagent
    .del(`${API_ROOT}${url}`)
    .set('Authorization', token)
    .end()
    .then(responseBody),
}

const personRqs = {
  userGet: (id, url, token) =>
    requests.getAuth(`People/${id}/${url}`, token),
  userPost: (id, url, token, body) =>
    requests.postAuth(`People/${id}/${url}`, token, body),
  userPut: (id, url, token, body) => {
    requests.putAuth(`People/${id}/${url}`, token, body)
  }
}

const searchSettings = {
  get: (id, token) =>
    personRqs.userGet(id, 'searchSettings', token),
  create: (id, token, body) =>
    personRqs.userPost(id, 'searchSettings', token, body),
  put: (id, token, body) =>
    personRqs.userPut(id, 'searchSettings', token, body)
}

const filterSettings = {
  get: (id, token) =>
    personRqs.userGet(id, 'filterSettings', token),
  create: (id, token, body) =>
    personRqs.userPost(id, 'filterSettings', token, body),
  put: (id, token, body) =>
    personRqs.userPut(id, 'filterSettings', token, body)
}

const jobs = {
  get: (id, token) =>
    personRqs.userGet(id, 'jobs', token),
  create: (id, token) => 
    personRqs.userPost(id, 'jobs', token),
  delete: (jobId, token) =>
    requests.deleteAuth(`Jobs/${jobId}`, token)
}


const Auth = {
  register: (username, email, password) => 
    requests.post('People', {
      username: username,
      email: email,
      password: password
    }),
  login: (username, password) => 
    requests.post('People/login', {
      username: username,
      password: password
    }),
  logout: (token) =>
    requests.postAuth(
      'People/logout',
      token
    )
}



export default {
  Auth,
  searchSettings,
  filterSettings,
  jobs
}