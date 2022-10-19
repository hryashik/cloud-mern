const jwt = require('jsonwebtoken')
const config = require('../config/default.json')

module.exports = (req, res, next) => {
  if (req.method === 'OPTION') return next()
  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ message: 'Auth error' })
    }
    const decoded = jwt.verify(token, config.tokenSecretKey)
    req.user = decoded
    next()
  } catch (e) {
    return res.status(401).json({ message: `${e}` })
  }
}
