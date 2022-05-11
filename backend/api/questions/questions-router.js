const router = require('express').Router()
const Question = require('./questions-model')

router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.getAll()
    res.json(questions)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { question_title } = req.body
    const validated = {}
    if (
      question_title !== undefined &&
      typeof question_title === 'string' &&
      question_title.trim().length > 2
    ) {
      validated.question_title = question_title.trim()
    } else {
      return res.status(422).json({
        message: 'question_title of at least 3 chars is required'
      })
    }
    const question = await Question.post(validated)
    res.status(201).json(question)
  } catch (err) {
    next(err)
  }
})

module.exports = router
