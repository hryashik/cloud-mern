import axios, { AxiosResponse } from 'axios'
import { ResponseDataType } from '../redux/slices/userSlice'

export const api = {
  instance: axios.create({
    baseURL: 'http://localhost:3333/api/auth',
  }),
  async registration(email: string, password: string) {
    const resp = await this.instance.post<ResponseDataType>('/registration', {
      email: email,
      password: password,
    })
    return resp
  },
  async login(email: string, password: string) {
    const resp = await this.instance.post('/login', {
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
}

export type AuthTokenType = {
  data: ResponseDataType
}
