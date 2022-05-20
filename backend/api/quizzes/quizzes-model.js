const db = require('../../data/db-config')

function randomizeArray(arr) {
  const result = [...arr]
  // In production we should use a fair PRNG, or a CSPRNG
  for (let idx in result) {
    const randomIdx = Math.floor(Math.random() * arr.length)
    // Items that will swap positions
    const item1 = result[idx]
    const item2 = result[randomIdx]
    // Perform the swap
    result[idx] = item2
    result[randomIdx] = item1
  }
  return result
}

async function randomQuiz() {
  const [{ question_id }] = await db.raw(`
    SELECT question_id FROM questions ORDER BY RANDOM() LIMIT 1
  `)
  const rows = await db.raw(`
    SELECT
      q.question_id, q.question_text,
      o.option_id, o.option_text
    FROM questions q
    JOIN options o
      ON q.question_id = o.question_id
    WHERE q.question_id = ?
  `, [question_id])

  const result = rows.reduce((acc, row) => {
    if (!acc.question_id) {
      acc.question_id = row.question_id
      acc.question_text = row.question_text
    }
    acc.options.push({
      option_id: row.option_id,
      option_text: row.option_text,
    })
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
    .sum('is_correct')
    .select('question_id')
  return answers
}

async function nextQuiz({ user_id }) {
  if (!user_id) {
    const random = await randomQuiz()
    return random
  }

  const answers = prevAnswers(user_id)
  if (!answers.length) {
    const random = await randomQuiz()
    return random
  }

  // TODO: build intelligent question choosing based on the history of answers
  const random = await randomQuiz()
  return random
}

async function answerQuiz({ question_id, option_id, user_id }) {
  const option = await db('options').where('option_id', option_id).first()
  if (user_id) {
    await db('answers').insert({ user_id, question_id, is_correct: option.is_correct })
  }
  return {
    remark: option.remark,
    verdict: `You ${option.is_correct ? "did great!" : "screwed up."}`,
  }
}

module.exports = {
  nextQuiz,
  answerQuiz,
  prevAnswers,
  randomQuiz,
}
