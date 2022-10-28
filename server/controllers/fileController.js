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
      console.log(e)
      res.status(500)
    }
  }
}

module.exports = new FileController()
