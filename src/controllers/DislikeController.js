const Dev = require('../models/Dev')

class DislikeController {
  async store(req, res) {
    try {
      const { devId } = req.params
      const { user } = req.headers

      const loggedDev = await Dev.findById(user)
      const targetDev = await Dev.findById(devId)

      if (!targetDev) {
        return res.status(400).json({ error: 'Dev not exists' })
      }

      loggedDev.dislikes.push(targetDev._id)

      await loggedDev.save()

      return res.json(loggedDev)
    } catch (error) {
      return res.json(error)
    }
  }
}

module.exports = new DislikeController()
