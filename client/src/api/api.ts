import axios from 'axios'

export interface UserType {
  diskSpace: number
  usedSpace: number
  email: string
  id: string
  avatar?: string
}

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
export interface UserData {
  token: string
  user: UserType
}
export const api = {
  instance: axios.create({
    baseURL: 'http://localhost:3333/api',
    /*     headers: {
      Authorization: localStorage.getItem('token'),
    }, */
  }),
  async registration(email: string, password: string) {
    const resp = await this.instance.post<UserData>('/auth/registration', {
      email: email,
      password: password,
    })
    return resp.data
  },
  async login(email: string, password: string) {
    const resp = await this.instance.post<UserData>('/auth/login', {
      email: email,
      password: password,
    })
    return resp.data
  },
  async auth() {
    try {
      const resp = await this.instance.get<UserData>('auth/auth', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      return resp.data
    } catch (e) {
      console.log(e)
    }
  },
  async getFiles(parentId: string, sortType?: string) {
    try {
      if (sortType) {
        const resp = await this.instance.get<FileType[]>(
          `/files${parentId ? `?parent=${parentId}` : ''}`,
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
            params: {
              sort: sortType,
            },
          },
        )
        return resp.data
      } else {
        const resp = await this.instance.get<FileType[]>(
          `/files${parentId ? `?parent=${parentId}` : ''}`,
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          },
        )
        return resp.data
      }
    } catch (e) {
      console.log(e)
    }
  },
  async createDir(nameDir: string, parentId: string) {
    try {
      if (parentId) {
        const resp = await this.instance.post<FileType>(
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
        return resp.data
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
        return resp.data
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
      const resp = await this.instance.post<FileType>(`/files/upload`, formData, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        onUploadProgress: ProgressEvent => {
          /* console.log(ProgressEvent) */
        },
      })
      return resp.data
    } catch (e) {
      console.log(e)
      alert('Загрузить файл не удалось')
    }
  },
  async downloadFile(file: FileType) {
    try {
      const fileBlob = await this.instance.get<Blob>(`/files/download/?fileId=${file._id}`, {
        responseType: 'blob',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      console.log(fileBlob.data)
      const downloadUrl = window.URL.createObjectURL(fileBlob.data)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (e) {
      console.log(e)
      alert('Скачать файл не удалось')
    }
  },
  async changeAvatar(link: string) {
    try {
      const response = await this.instance.post(
        '/users/avatar',
        {
          link: link,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      )
      return response.data
    } catch (e) {
      console.log(e)
    }
  },
}
