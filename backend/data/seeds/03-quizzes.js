exports.seed = async function (knex) {
  await knex('questions').insert([
    {
      question_title: 'Bilbo\'s Pocket',
      question_text: 'What\'s in Bilbo\'s pocket?',
      question_hint: 'You know...',
    },
  ])
  await knex('options').insert([
    {
      option_text: 'Nothing',
      option_remark: 'Nice try...',
      is_distractor: true,
      question_id: 1,
    },
    {
      option_text: 'The One Ring',
      option_remark: 'There ya go!',
      is_distractor: false,
      question_id: 1,
    },
  ])
}
