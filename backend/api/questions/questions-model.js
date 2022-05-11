const db = require('../../data/db-config')

async function getAll() {
  const questions = await db('questions')
  const options = await db('options')

  questions.forEach(q => {
    const q_options = options.filter(o => o.question_id == q.question_id)
    q.options = q_options
  })

  return questions
}

module.exports = {
  getAll,
}
