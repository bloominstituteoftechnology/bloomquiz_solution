const db = require('../../data/db-config')

async function randomQuiz() {
  const [random] = await db.raw('SELECT * FROM questions ORDER BY RANDOM() LIMIT 1')
  return random
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
  // TODO: build middleware to check that option_id belongs to question_id
  const option = await db('options').where('option_id', option_id).first()
  await db('answers').insert({ user_id, question_id, is_correct: !option.is_distractor })
  return {
    remark: option.remark,
    verdict: `You ${option.is_distractor ? "screwed up!" : "did great!"}`,
  }
}

module.exports = {
  nextQuiz,
  answerQuiz,
  prevAnswers,
  randomQuiz,
}
