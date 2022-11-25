const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const config = require('../config/default.json')
const fileService = require('../services/fileService')
const File = require('../models/File')
const AuthService = require('../services/authService')


class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Uncorrect request', errors })
      }
      const { email, password } = req.body
      const candidate = await AuthService.findUserByEmail()

      if (candidate) {
        return res.status(400).json({ message: `User with ${email} is already exist` })
      }

      const hashPassword = await bcrypt.hash(password, 8)
      const user = await AuthService.addUserDb(email, hashPassword)

      await fileService.createDir(new File({ name: '', user: user.id }))
      const token = jwt.sign({ id: user.id }, config.tokenSecretKey, { expiresIn: '1h' })

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar,
        },
      })
    } catch (e) {
      console.log(e)
      res.send('Server error')
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await AuthService.findUserByEmail(email)
      if (!user) {
        console.log(req.body)
        return res.status(404).json({ message: 'User not found' })
      }
      const validatePassword = bcrypt.compareSync(password, user.password)
      if (!validatePassword) {
        return res.status(404).json({ message: 'Invalid password' })
      }
      const token = jwt.sign({ id: user.id }, config.tokenSecretKey, { expiresIn: '1h' })
      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar,
        },
      })
    } catch (e) {
      console.log(e)
      res.send('Server error')
    }
  }
  async auth(req, res) {
    try {
      const user = await AuthService.findUserById(req.user.id)
      const token = jwt.sign({ id: user.id }, config.tokenSecretKey, { expiresIn: '1h' })
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new AuthController()