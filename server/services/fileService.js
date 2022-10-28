const { resolveSoa } = require('dns')
const fs = require('fs')
const path = require('path')
const File = require('../models/File')
const fsExtra = require('fs-extra')

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
    return new Promise(async (resolve, reject) => {
      try {
        if (file.type === 'dir') {
          await fsExtra.remove(filePath)
        } else {
          fs.unlinkSync(filePath)
        }
        console.log('file was deleted')
        return resolve({ message: 'File was deleted' })
      } catch (e) {
        return reject({ message: 'File error' })
      }
    })
  }
  renameFile(file, newName) {
    const filePath = path.join(__dirname, `../__usersfiles/${file.user}/${file.path}`)
    const newPath = filePath.replace(file.name, newName)
    return new Promise((resolve, reject) => {
      try {
        fs.rename(filePath, newPath, err => {
          if (err) throw err
        })
        return resolve({ message: 'File was renamed' })
      } catch (e) {
        return reject({ message: 'File error' })
      }
    })
  }
}

module.exports = new FileService()
