const router = require('express').Router()
const Stats = require('./stats-model')
const { restrict } = require('../auth/auth-middleware')

router.get('/general', restrict, async (req, res, next) => {
  try {
    const stats = await Stats.generalStats(req.token.user_id)
    res.json(stats)
  } catch (err) {
    next(err)
  }
})

module.exports = router
