const fs = require('fs')
const path = require('path')
const File = require('../models/File')

class FileService {
  createDir(file) {
    const filePath = path.join(__dirname, `../__usersfiles/${file.user}/${file.path}`)
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true })
          return resolve({ message: 'File was created' })
        } else {
          console.log()
          return reject({ message: 'File already exist' })
        }
      } catch (e) {
        return reject({ message: 'File error' })
      }
    })
  }
  deleteFile(file) {
    const filePath = path.join(__dirname, `../__usersfiles/${file.user}/${file.path}`)
    return new Promise((resolve, reject) => {
      try {
        if (file.type === 'dir') {
          fs.rmdirSync(filePath)
        } else {
          fs.unlinkSync(filePath)
        }
        return resolve({ message: 'File was deleted' })
      } catch (e) {
        return reject({ message: 'File error' })
      }
    })
  }
}

module.exports = new FileService()
