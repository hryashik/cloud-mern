const Router = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const config = require('../config/default.json')
const router = new Router()

router.post(
  '/registration',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Password must be longer than 3 and shorter than 12').isLength({
      min: 3,
      max: 12,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Uncorrect request', errors })
      }
      const { email, password } = req.body
      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: `User with ${email} is already exist` })
      }
      const hashPassword = await bcrypt.hash(password, 8)
      const user = new User({ email, password: hashPassword })
      await user.save()
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
  },
)
router.post('/login', async (req, res) => {
  console.log(req.body)
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
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
})

module.exports = router
