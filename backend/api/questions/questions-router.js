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
    const { question_title, question_text, question_hint } = req.body
    const validatedQuestion = { options: [] }

    // VALIDATING question_title
    if (
      question_title !== undefined &&
      typeof question_title === 'string' &&
      question_title.trim().length > 2
    ) {
      validatedQuestion.question_title = question_title.trim()
    } else {
      return res.status(422).json({
        message: 'question_title of at least 3 chars is required',
      })
    }
    // VALIDATING question_text
    if (
      question_text !== undefined &&
      typeof question_text === 'string' &&
      question_text.trim().length > 0
    ) {
      validatedQuestion.question_text = question_text.trim()
    } else {
      return res.status(422).json({
        message: 'question_text of at least 1 char is required',
      })
    }
    // VALIDATING question_hint
    if (
      question_hint !== undefined &&
      typeof question_hint === 'string' &&
      question_hint.trim().length > 0
    ) {
      validatedQuestion.question_hint = question_hint.trim()
    }

    const { options } = req.body
    for (let option of options) {
      const { option_text, is_distractor, remark } = option
      const validatedOption = {}

      // VALIDATING option_text
      if (
        option_text !== undefined &&
        typeof option_text === 'string' &&
        option_text.trim().length > 0
      ) {
        validatedOption.option_text = option_text.trim()
      } else {
        return res.status(422).json({
          message: 'option_text of at least 1 char is required',
        })
      }
      // VALIDATING option_text
      if (
        is_distractor !== undefined &&
        typeof is_distractor === 'boolean'
      ) {
        validatedOption.is_distractor = is_distractor
      } else {
        return res.status(422).json({
          message: 'is_distractor (true or false) for each option is required',
        })
      }
      // VALIDATING option_text
      if (
        remark !== undefined &&
        typeof remark === 'string' &&
        remark.trim().length > 0
      ) {
        validatedOption.remark = remark.trim()
      }
      validatedQuestion.options.push(validatedOption)
    }

    // VALIDATING that at least 2 options are provided
    if (validatedQuestion.options.length < 2) {
      return res.status(422).json({
        message: 'provide one correct option and at least one distractor',
      })
    }

    // VALIDATING exactly one option is a non-distractor
    const nonDistractorCount = validatedQuestion.options.filter(o => !o.is_distractor).length
    if (nonDistractorCount !== 1) {
      return res.status(422).json({
        message: 'provide one correct option and at least one distractor',
      })
    }

    // VALIDATING no two options have the same option_text
    if (
      validatedQuestion.options[0].option_text.trim() ===
      validatedQuestion.options[0].option_text.trim()
    ) {
      return res.status(422).json({
        message: 'the option_texts cannot all be the same',
      })
    }

    const question = await Question.create(validatedQuestion)
    res.status(201).json(question)
  } catch (err) {
    next(err)
  }
})

module.exports = router
