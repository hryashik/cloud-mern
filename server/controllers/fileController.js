const User = require('../models/User')
const File = require('../models/File')
const fileService = require('../services/fileService')
const path = require('path')

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
      await File.deleteOne({ _id: fileId })
      await fileService.deleteFile(file)
      res.status(200).json({ message: 'file was deleted' })
    } catch (e) {
      console.log(e)
      res.status(500).json(e)
    }
  }
  async renameFile(req, res) {
    try {
      const { fileId, newName } = req.body
      await File.findOneAndUpdate({ _id: fileId }, { name: newName })
      res.json({ message: 'File was renamed' })
    } catch (e) {
      console.log(e)
      res.status(500)
    }
  }
}

module.exports = new FileController()
