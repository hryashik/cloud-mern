const { findById } = require("../models/User");
const User = require("../models/User");

class UsersService {
  async changeAvatar(userId, link) {
    try {
      await User.findByIdAndUpdate(userId, { avatar: link })
      return await User.findById(userId)
    } catch (e) {
      console.log(`Service error ${e}`)
    }
  }
}

module.exports = new UsersService()