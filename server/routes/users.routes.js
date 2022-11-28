const Router = require('express')
const authMiddleware = require('../middleware/auth-middleware')
const usersController = require('../controllers/usersController')

const router = new Router()

router.post('/avatar', authMiddleware, usersController.changeAvatar)

module.exports = router