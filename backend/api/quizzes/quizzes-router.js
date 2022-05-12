const router = require('express').Router()
const Quiz = require('./quizzes-model')

router.get('/next', async (req, res, next) => {
  try {
    const nextQuiz = await Quiz.next({ user_id: req?.user?.user_id || 2 }) // TODO
    res.json(nextQuiz)
  } catch (err) {
    next(err)
  }
})

router.post('/answer', async (req, res, next) => {
  try {
    // MUST VALIDATE THAT option_id BELONGS TO question_id
    const { question_id, option_id } = req.body
    const resp = await Quiz.answer({ question_id, option_id, user_id: req?.user?.user_id || 2 }) // TODO
    res.json(resp)
  } catch (err) {
    next(err)
  }
})

module.exports = router
