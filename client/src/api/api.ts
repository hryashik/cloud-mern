import axios, { AxiosResponse } from 'axios'
import { ResponseDataType } from '../redux/slices/userSlice'

export const api = {
  instance: axios.create({
    baseURL: 'http://localhost:3333/api',
  }),
  async registration(email: string, password: string) {
    const resp = await this.instance.post<ResponseDataType>('/auth/registration', {
      email: email,
      password: password,
    })
    return resp
  },
  async login(email: string, password: string) {
    const resp = await this.instance.post('/auth/login', {
      email: email,
      password: password,
    })
    return resp
  },

  async auth() {
    try {
      const resp: AuthTokenType = await axios.get('http://localhost:3333/api/auth/auth', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      return resp
    } catch (e) {
      console.log(e)
    }
  },

  async getFiles() {
    try {
      const resp = await this.instance.get('/files', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      return resp
    } catch (e) {
      console.log(e)
    }
  },
}

export type AuthTokenType = {
  data: ResponseDataType
}
