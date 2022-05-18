export default function ({ $axios, env }, inject) {
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'Application/json'
      }
    }
  })
  api.onRequest(
    (config) => {
      config.headers.common.Authorization = `Bearer ${
        localStorage.getItem('access_token') || ''
      }`
      return config
    },
    error => Promise.reject(error)
  )
  api.onResponse(
    response => response.data,
    (error) => {
      if (error.response.status === 401) {
        // refreshtoken
      } else {
        return Promise.reject(error.response)
      }
    }
  )
  api.setBaseURL(env.baseUrl)
  inject('api', api)
}
