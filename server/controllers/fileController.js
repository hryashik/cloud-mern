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
      return res.status(40).json(e)
    }
  }
  async fetchFiles(req, res) {
    try {
      if (req.query.parent) {
        const files = await File.find({ user: req.user.id, parent: req.query.parent })
        return res.json(files)
      } else {
        const files = await File.find({ user: req.user.id })
        return res.json(files)
      }
    } catch (e) {
      res.status(500).json({ message: 'Can not get files' })
    }
  }
}

module.exports = new FileController()
