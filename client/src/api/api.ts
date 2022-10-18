import axios from 'axios'

export const api = {
  instance: axios.create({
    baseURL: 'http://localhost:3333/api/auth',
  }),
  async registration(email: string, password: string) {
    const resp = await this.instance.post('/registration', {
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
