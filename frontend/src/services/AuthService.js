import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:8082`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

export default {
  register(credentials) {
    return apiClient.post('/authentication/register', credentials)
  },
  setAuthHeader(userData) {
    apiClient.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${userData.token}`
  },
  login(credentials) {
    return apiClient.post('/authentication/login', credentials)
  },
}
