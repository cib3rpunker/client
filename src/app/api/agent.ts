import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

axios.defaults.baseURL = 'http://localhost:5000/api/'

const responseBody = (response: AxiosResponse) => response.data

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    console.log('🪓 Caught by AXIOS interceptor')
    // const {data, status} = error.response!
    const {status} = error.response!

    switch (status) {
      case 400:
        toast.error('🔴 Bad request. Please try again.')
        break

      case 401:
        toast.error('🔴 401 You are not authorized to perform this action. ')
        break

      case 404:
        toast.error('🔴 404 Not Found.')
        break

      case 500:
          toast.error('🔴 500 Internal Server Error. Caught by AXIOS intercept')
          break

      default:
        break
    }

    return Promise.reject(error.response)
  },
)

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
  list: () => requests.get('products'),
  details: (id: number) => requests.get(`products/${id}`),
}

const TestErrors = {
  get400Error: () => requests.get('buggy/bad-requests'),
  get401Error: () => requests.get('buggy/unauthorized'),
  get404Error: () => requests.get('buggy/not-found'),
  get500Error: () => requests.get('buggy/server-error'),
  getValidationError: () => requests.get('buggy/validation-error'),
}

const agent = {
  Catalog,
  TestErrors,
}

export default agent
