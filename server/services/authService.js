const User = require("../models/User")

class AuthService {
  async findUserById(id) {
    return await User.findById(id)
  }
  async findUserByEmail(email) {
    return await User.findOne({ email })
  }
  async addUserDb(email, password) {
    const user = new User({ email, password })
    await user.save()
    return user
  }
}

module.exports = new AuthService()