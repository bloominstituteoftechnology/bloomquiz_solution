const db = require('../../data/db-config')

async function getAll() {
  const questions = await db('questions')
    .select('question_title', 'question_text', 'question_id')
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

async function getByIds(question_ids) {
  const questions = await db('questions')
    .select('question_title', 'question_text', 'question_id')
    .whereIn('question_id', question_ids)
  let options = await db('options').whereIn('question_id', question_ids)
    .select('option_id', 'option_text', 'is_correct', 'remark', 'question_id')
  questions.forEach(q => {
    q.options = []
    options.forEach(o => {
      if (o.question_id === q.question_id) {
        q.options.push({
          option_id: o.option_id,
          option_text: o.option_text,
          is_correct: !!o.is_correct,
          remark: o.remark,
        })
      }
    })
  })
  return questions
}

async function create(question) {
  let { options, ...rest } = question
  const [question_id] = await db('questions').insert(rest, ['question_id'])
  options = options.map(o => ({ ...o, question_id }))
  await db('options').insert(options)
  const [newQuestion] = await getByIds([question_id])
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
  await db('questions').where('question_id', question_id)
    .update({ question_title, question_text })
  const [editedQuestion] = await getByIds([question_id])
  return editedQuestion
}

async function getByText({ text }) {
  const questions = await db.raw(`
    SELECT question_id FROM question_search WHERE question_search MATCH ?;
  `, [text])
  const result = await getByIds(questions.map(q => q.question_id))
  return result
}

module.exports = {
  getAll,
  create,
  editById,
  getByText,
  getByIds,
}
