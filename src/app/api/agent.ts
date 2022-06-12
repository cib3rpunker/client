import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { history } from '../..'   // index.tsx

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500))

axios.defaults.baseURL = 'http://localhost:5000/api/'

const responseBody = (response: AxiosResponse) => response.data

axios.interceptors.response.use(
  async (response) => {
    await sleep()

    return response
  },
  (error: AxiosError) => {
    console.log('🪓 Caught by AXIOS interceptor')
    // const {data0} = error.response!
    const data = (error.response?.data as unknown) || {}
    const { status } = error.response!

    switch (status) {
      case 400:
        // @ts-ignore
        if (data.errors) {
          const modelStateErrors: string[] = []
          // @ts-ignore
          for (const key in data.errors) {
            // @ts-ignore
            if (data.errors.hasOwnProperty(key)) {
              // @ts-ignore
              modelStateErrors.push(data.errors[key])
            }
          }
          // toast.error(modelStateErrors.join('\n'))
          throw modelStateErrors.flat()
        }

        // toast.error(data ? data.title : 'Bad request')
        toast.error('🔥 Bad request')
        break

      case 401:
        toast.error('🔴 401 You are not authorized to perform this action. ')
        break

      case 404:
        toast.error('🔴 404 Not Found.')
        break

      case 500:
        history.push({
          pathname: '/server-error',
          state: { error: {status: 500, title: '🟥 This is a server error', details: 'EMPTY'} }
        })
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
