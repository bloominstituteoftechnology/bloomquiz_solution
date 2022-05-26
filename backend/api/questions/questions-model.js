const db = require('../../data/db-config')

async function getAll() {
  const questions = await db('questions')
    .select('question_title', 'question_text', 'question_id', 'updated_at')
    .orderBy('updated_at', 'desc')
  let options = await db('options')
    .select('option_id', 'option_text', 'is_correct', 'remark', 'question_id')
  questions.forEach(q => {
    let q_options = options.filter(o => o.question_id == q.question_id)
    q_options = q_options.map(o => ({
      option_id: o.option_id,
      option_text: o.option_text,
      is_correct: !!o.is_correct,
      remark: o.remark,
    }))
    q.options = q_options
  })
  return questions
}

async function getById(question_id) {
  const question = await db('questions').where('question_id', question_id).first()
  let options = await db('options').where('question_id', question_id)
  options = options.map(o => ({ ...o, is_correct: !!o.is_correct }))
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

async function editById(question_id, { options, ...rest }) {
  await db('options').where('question_id', question_id).delete()
  const promises = options.map(option => {
    return db('options').where('option_id', option.option_id).insert({
      option_text: option.option_text,
      remark: option.remark,
      is_correct: option.is_correct,
      question_id,
    })
  })
  await Promise.all(promises)
  const { question_title, question_text } = rest
  await db('questions').where('question_id', question_id).update({ question_title, question_text })
  return await getById(question_id)
}

module.exports = {
  getAll,
  create,
  getById,
  editById,
}
