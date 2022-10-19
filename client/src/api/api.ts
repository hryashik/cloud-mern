import axios from 'axios'
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
  async auth(email: string, password: string) {
    const resp = await this.instance.post('/login', {
      email: email,
      password: password,
    })
    return resp
  },
}
