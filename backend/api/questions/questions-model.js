const db = require('../../data/db-config')

async function get(question_ids) {
  const questionsQuery = db('questions')
    .select('question_title', 'question_text', 'question_id')
    .orderBy('updated_at', 'desc')
  const optionsQuery = db('options')
    .select('option_id', 'option_text', 'is_correct', 'remark', 'question_id')
  if (question_ids) {
    questionsQuery.whereIn('question_id', question_ids)
    optionsQuery.whereIn('question_id', question_ids)
  }
  const questions = await questionsQuery
  const options = await optionsQuery
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
  // return [{
  //   question_title: "Bilbo's Pocket",
  //   question_text: "What's in Bilbo's pocket?",
  //   question_id: 1,
  //   options: [
  //     { option_id: 1, option_text: "The One Ring.", is_correct: true, remark: null },
  //     { option_id: 2, option_text: "Hand.", is_correct: false, remark: null },
  //     { option_id: 3, option_text: "Nothing.", is_correct: false, remark: null },
  //   ]
  // }]
}

async function getAll() {
  const questions = await get()
  return questions
}

async function create(question) {
  let created_question_id
  await db.transaction(async trx => {
    let { options, ...rest } = question
    const [question_id] = await trx('questions').insert(rest)
    options = options.map(option => ({ ...option, question_id }))
    await trx('options').insert(options)
    created_question_id = question_id
  })
  const [created_question] = await get([created_question_id])
  return created_question
}

async function editById(question_id, { options, ...rest }) {
  await db.transaction(async trx => {
    await trx('options').where('question_id', question_id).delete()
    const promises = options.map(option => {
      return trx('options').where('option_id', option.option_id).insert({ ...option, question_id })
    })
    await Promise.all(promises)
    const { question_title, question_text } = rest
    await trx('questions').where('question_id', question_id)
      .update({ question_title, question_text })
  })
  const [editedQuestion] = await get([question_id])
  return editedQuestion
}

async function getByText({ text }) {
  const questions = await db.raw(`
    SELECT question_id FROM question_search WHERE question_search MATCH ?;
  `, [text])
  const result = await get(questions.map(q => q.question_id))
  return result
}

module.exports = {
  getAll,
  create,
  editById,
  getByText,
  get,
}
