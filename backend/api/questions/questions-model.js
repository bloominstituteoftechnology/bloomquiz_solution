const db = require('../../data/db-config')

async function getAll() {
  const questions = await db('questions').orderBy('updated_at', 'desc')
  let options = await db('options')
  options = options.map(o => ({ ...o, is_distractor: !!o.is_distractor }))
  questions.forEach(q => {
    const q_options = options.filter(o => o.question_id == q.question_id)
    q.options = q_options
  })
  return questions
}

async function getById(question_id) {
  const question = await db('questions').where('question_id', question_id).first()
  let options = await db('options').where('question_id', question_id)
  options = options.map(o => ({ ...o, is_distractor: !!o.is_distractor }))
  question.options = options
  return question
}

async function create(question) {
  let { options, ...rest } = question
  const [question_id] = await db('questions').insert([rest], ['question_id'])
  options = options.map(o => ({ ...o, question_id }))
  await db('options').insert(options)
  const newQuestion = await getById(question_id)
  return newQuestion
}

module.exports = {
  getAll,
  create,
  getById,
}
