const db = require('../../data/db-config')

async function next({ user_id }) {
  const answers = await db('answers')
    .where('user_id', user_id)
    .groupBy('question_id')
    .count('question_id')
    .sum('is_correct')
    .select('question_id')
  // TODO: spaced repetition
  if (!answers.length) {
    const [random] = await db.raw('SELECT * FROM questions ORDER BY RANDOM() LIMIT 1')
    return random
  }
  const { question_id } = answers[Math.floor(Math.random() * answers.length - 1)]
  const question = await db('questions').where('question_id', question_id).first()
  return question
}

async function answer({ question_id, option_id, user_id }) {
  const option = await db('options').where('option_id', option_id).first()
  await db('answers').insert({ user_id, question_id, is_correct: !option.is_distractor })
  return {
    remark: option.remark,
    verdict: `You ${option.is_distractor ? "screwed up!" : "did great!"}`,
  }
}

module.exports = {
  next,
  answer,
}
