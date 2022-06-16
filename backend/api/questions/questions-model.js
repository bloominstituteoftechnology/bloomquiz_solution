const db = require('../../data/db-config')

async function get(question_ids) {
  return [{
    question_title: "Bilbo's Pocket",
    question_id: 1,
    question_text: "What's in Bilbo's pocket?",
    options: [
      { option_id: 1, option_text: "The One Ring.", is_correct: true, remark: null },
      { option_id: 2, option_text: "Hand.", is_correct: false, remark: null },
      { option_id: 3, option_text: "Nothing.", is_correct: false, remark: null },
    ]
  }]
}

async function getAll() {
  const rows = await db('questions as q')
    .join('options as o', 'q.question_id', 'o.question_id')
    .orderBy('q.updated_at', 'desc')
    .select('q.question_id', 'question_title', 'question_text', 'option_id', 'option_text', 'remark', 'is_correct')
  const reduced = rows.reduce((acc, row) => {
    const q = {
      question_title: row.question_title,
      question_text: row.question_text,
      question_id: row.question_id,
    }
    const o = {
      option_id: row.option_id,
      option_text: row.option_text,
      is_correct: !!row.is_correct,
      remark: row.remark,
    }
    if (q.question_id !== acc.question_id) {
      acc.questions.push({ ...q, options: [o] })
      acc.question_id = q.question_id
    } else {
      acc.questions[acc.questions.length - 1].options.push(o)
    }
    return acc
  }, { question_id: null, questions: [] })
  return reduced.questions
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
