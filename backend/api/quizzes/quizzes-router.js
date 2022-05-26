const router = require('express').Router()
const Quiz = require('./quizzes-model')

router.get('/next', async (req, res, next) => {
  try {
    const user_id = req?.token?.user_id
    const role_id = req?.token?.role_id
    const nextQuiz = await Quiz.nextQuiz({ user_id, role_id })
    res.json(nextQuiz)
  } catch (err) {
    next(err)
  }
})

router.post('/answer', async (req, res, next) => {
  try {
    // TODO: build middleware to check that option_id belongs to question_id
    const { question_id, option_id } = req.body
    const user_id = req?.token?.user_id
    const resp = await Quiz.answerQuiz({ question_id, option_id, user_id })
    res.json(resp)
  } catch (err) {
    next(err)
  }
})

module.exports = router
