const router = require('express').Router()
const Quiz = require('./quizzes-model')

router.get('/next', async (req, res, next) => {
  try {
    const nextQuiz = await Quiz.next({ user_id: req.user.user_id })
    res.json(nextQuiz)
  } catch (err) {
    next(err)
  }
})

router.post('/answer', async (req, res, next) => {
  try {
    const { user_id } = req.user
    const { question_id, option_id } = req.body
    const resp = await Quiz.answer({ question_id, option_id, user_id })
    res.json(resp)
  } catch (err) {
    next(err)
  }
})

module.exports = router
