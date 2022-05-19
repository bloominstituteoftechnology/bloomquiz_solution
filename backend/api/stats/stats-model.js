const db = require('../../data/db-config')

async function generalStats(user_id) {
  const [{ corrects }] = await db('answers')
    .where({ user_id, is_correct: true })
    .count('answer_id as corrects')
  const [{ incorrects }] = await db('answers')
    .where({ user_id, is_correct: false })
    .count('answer_id as incorrects')
  return {
    corrects,
    incorrects,
  }
}

module.exports = {
  generalStats,
}
