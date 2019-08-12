/* eslint-disable linebreak-style */
const api = require('../services/api')
const Dev = require('../models/Dev')

class DevController {
  async index(req, res) {
    try {
      const { user } = req.headers

      const loggedDev = await Dev.findById(user)

      const users = await Dev.find({
        $and: [
          { _id: { $ne: user } },
          { _id: { $nin: loggedDev.likes } },
          { _id: { $nin: loggedDev.dislikes } }
        ]
      })

      return res.json(users)
    } catch (error) {
      return res.json(error)
    }
  }

  async store(req, res) {
    const { username } = req.body

    const userExists = await Dev.findOne({ user: username })

    if (userExists) {
      return res.json(userExists)
    }

    const response = await api.get(`users/${username}`)

    const { name, bio, avatar_url: avatar } = response.data

    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    })

    return res.json(dev)
  }
}

module.exports = new DevController()
