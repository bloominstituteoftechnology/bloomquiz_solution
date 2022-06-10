const db = require('../../data/db-config')
const { randomizeArray } = require('../../../shared/utils')

async function randomQuiz({ role_id }) {
  const [{ question_id }] = await db.raw(`
    SELECT question_id FROM questions ORDER BY RANDOM() LIMIT 1
  `)
  const rows = await db.raw(`
    SELECT
      q.question_id, q.question_text, q.question_title,
      o.option_id, o.option_text, o.is_correct
    FROM questions q
    JOIN options o
      ON q.question_id = o.question_id
    WHERE q.question_id = ?
  `, [question_id])

  const result = rows.reduce((acc, row) => {
    if (!acc.question_id) {
      acc.question_id = row.question_id
      acc.question_text = row.question_text

      if (role_id === 1) { // admin user
        acc.question_title = row.question_title
      }
    }
    const option = {
      option_id: row.option_id,
      option_text: row.option_text,
    }
    if (role_id === 1) { // admin user
      option.is_correct = !!row.is_correct
    }
    acc.options.push(option)
    return acc
  }, { options: [] })
  const randomOptions = randomizeArray(result.options)
  result.options = randomOptions
  return result
}

async function prevAnswers(user_id) {
  const answers = await db('answers')
    .where('user_id', user_id)
    .groupBy('question_id')
    .count('question_id')
    .sum('correctly_answered')
    .select('question_id')
  return answers
}

/**
 * @param {{ user_id: Number, role_id: Number }} user
 * @returns {Object}
 */
async function nextQuiz({ user_id, role_id }) {
  if (!user_id) {
    // anon users get a random quiz
    const random = await randomQuiz({ role_id })
    return random
  }

  const answers = prevAnswers(user_id)
  if (!answers.length) {
    // users with no history of answers should get random
    const random = await randomQuiz({ role_id })
    return random
  }

  // TODO: build intelligent quiz choosing based on the history of answers
  const random = await randomQuiz({ role_id })
  return random
}

/**
 * @param {{ question_id: number, option_id: number, user_id: number }} answer
 * @returns {Object}
 */
async function answerQuiz({ question_id, option_id, user_id }) {
  const option = await db('options').where('option_id', option_id).first()
  if (user_id && user_id != 1) {
    await db('answers').insert({ user_id, question_id, correctly_answered: option.is_correct })
  }
  return {
    remark: option.remark,
    is_correct: !!option.is_correct,
    verdict: `You ${option.is_correct ? "are CORRECT" : "screwed up"}`,
  }
}

module.exports = {
  nextQuiz,
  answerQuiz,
}
