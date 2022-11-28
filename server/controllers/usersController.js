const usersService = require("../services/usersService")

class UsersController {
  async changeAvatar(req, res) {
    const { link } = req.body
    const user = await usersService.changeAvatar(req.user.id, link)
    res.json(user)
  }
}

module.exports = new UsersController()