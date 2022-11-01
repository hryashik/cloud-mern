import axios from 'axios'
import { ResponseDataType } from '../redux/slices/userSlice'

export interface FileType {
  _id: string
  date: string
  name: string
  path: string
  parent?: string
  type: string
  user: string
  size: number
  childs: string[] | null
}

export type AuthTokenType = {
  data: ResponseDataType
}

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
  async getFiles(parentId: string) {
    try {
      const resp = await this.instance.get<FileType[]>(
        `/files${parentId ? `?parent=${parentId}` : ''}`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      )
      return resp
    } catch (e) {
      console.log(e)
    }
  },
  async createDir(nameDir: string, parentId: string) {
    try {
      if (parentId) {
        const resp = await this.instance.post(
          '/files',
          {
            name: nameDir,
            type: 'dir',
            parent: parentId,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          },
        )
        return resp
      } else {
        const resp = await this.instance.post(
          '/files',
          {
            name: nameDir,
            type: 'dir',
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          },
        )
        return resp
      }
    } catch (e) {
      console.log(e)
    }
  },
  async deleteFile(id: string) {
    try {
      const resp = await this.instance.delete<{ message: string }>(`/files/?fileId=${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      return resp.data
    } catch (e) {
      console.log(e)
    }
  },
  async renameFile(fileId: string, newName: string) {
    try {
      const resp = await this.instance.patch(
        '/files',
        {
          fileId,
          newName,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      )
      return resp
    } catch (e) {
      alert('Файл не удалось переименовать')
    }
  },
  async uploadFile(file: File, currentDir: string) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (currentDir) {
        formData.append('parent', currentDir)
      }
      const resp = await this.instance.post(`/files/upload`, formData, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        onUploadProgress: ProgressEvent => {
          console.log(ProgressEvent)
        },
      })
      return resp.data
    } catch (e) {
      console.log(e)
      alert('Загрузить файл не удалось')
    }
  },
}
