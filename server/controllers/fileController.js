const User = require('../models/User')
const File = require('../models/File')
const fileService = require('../services/fileService')
const path = require('path')
const fs = require('fs')

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, parent } = req.body
      const file = new File({ name, type, parent, user: req.user.id })
      const parentFile = await File.findOne({ _id: parent })
      if (!parentFile) {
        file.path = name
        await fileService.createDir(file)
      } else {
        file.path = path.join(`${parentFile.path}/${file.name}`)
        await fileService.createDir(file)
        parentFile.childs.push(file._id)
        await parentFile.save()
      }
      await file.save()
      return res.json(file)
    } catch (e) {
      console.log(e)
      return res.status(400).json(e)
    }
  }
  async fetchFiles(req, res) {
    try {
      const files = await File.find({ user: req.user.id, parent: req.query.parent })
      return res.json(files)
    } catch (e) {
      res.status(500).json({ message: 'Can not get files' })
    }
  }
  async deleteFile(req, res) {
    try {
      const { fileId } = req.query
      const file = await File.findOne({ _id: fileId })
      //if dir has kids
      if (file.childs.length) {
        //initialize kids and delete them in the db
        const kids = await File.find({ parent: fileId })
        kids.forEach(async el => await el.remove())
        await fileService.deleteFile(file)
      } else {
        await File.deleteOne({ _id: fileId })
      }
      await file.remove()
      res.status(200).json({ message: 'file was deleted' })
    } catch (e) {
      console.log(e)
      res.status(500).json(e)
    }
  }
  async renameFile(req, res) {
    try {
      const { fileId, newName } = req.body
      const file = await File.findOne({ _id: fileId })
      if (file.childs.length) {
        res
          .status(401)
          .json({ message: 'Before rename parent directory, you should delete all childs' })
        return
      }

      await file.updateOne({ name: newName, path: file.path.replace(file.name, newName) })
      await fileService.renameFile(file, newName)
      res.json({ message: 'File was renamed' })
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async uploadFile(req, res) {
    try {
      const user = await User.findOne({ _id: req.user.id })
      const file = req.files.file
      const { parent } = req.body
      //Проверка на наличие свободного места
      if (user.usedSpace + file.size > user.diskSpace) {
        res.status(400).json({ message: 'There no space on disk' })
      }
      const parentDir = await File.findOne({ _id: parent })
      let filePath
      // Проверка на наличие родителя
      if (parentDir) {
        filePath = path.join(
          __dirname,
          `../__usersFiles/${user._id}/${parentDir.path}/${file.name}`,
        )
      } else {
        filePath = path.join(__dirname, `../__usersFiles/${user._id}/${file.name}`)
      }
      // Проверка на наличие файла с таким же именем
      if (fs.existsSync(filePath)) {
        return res.status(400).json({ message: 'File with this name is already exist' })
      }

      await fileService.saveFile(file, filePath)
      const fileType = filePath.split('.').pop()

      function analizePath() {
        if (parentDir) {
          return path.join(`${parentDir.path}/${file.name}`)
        } else {
          return path.join(`${file.name}`)
        }
      }
      const dbFile = new File({
        name: file.name,
        type: fileType,
        size: file.size,
        path: analizePath(),
        parent: parentDir?._id,
        user: user._id,
      })
      dbFile.save()
      user.usedSpace = user.usedSpace + file.size
      user.save()
      res.json(dbFile)
      /* let filePath = parentDir
        ? path.join(__dirname, `../__usersFiles/${user._id}/${parentDir.path}/${file.name}`)
        : path.join(__dirname, `../__usersFiles/${user._id}/${file.name}}`) */
      /* console.log(filePath)
      await file.mv(filePath) */
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Upload was error' })
    }
  }
}

module.exports = new FileController()
