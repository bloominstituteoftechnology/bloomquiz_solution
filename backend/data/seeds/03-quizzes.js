exports.seed = async function (knex) {
  await knex('questions').insert([
    {
      question_title: 'Bilbo\'s Pocket',
      question_text: 'What\'s in Bilbo\'s pocket?',
      question_hint: 'You know...',
    },
    {
      question_title: 'Meaning of Life',
      question_text: 'What is the meaning of life?',
      question_hint: 'Not work, das for sure!',
    },
    {
      question_title: 'Closures',
      question_text: 'What is a closure?',
      question_hint: 'Think a car with tinted windows',
    },
  ])
  await knex('options').insert([
    {
      option_text: 'Hand',
      is_correct: false,
      remark: 'Nope...',
      question_id: 1,
    },
    {
      option_text: 'Nothing',
      is_correct: false,
      remark: 'Nice try though...',
      question_id: 1,
    },
    {
      option_text: 'The One Ring',
      is_correct: true,
      remark: 'There ya go!',
      question_id: 1,
    },
    {
      option_text: 'Work',
      is_correct: false,
      remark: 'Really??',
      question_id: 2,
    },
    {
      option_text: 'Family and friends',
      is_correct: true,
      remark: 'There ya go!',
      question_id: 2,
    },
    {
      option_text: 'Function object plus bindings',
      is_correct: true,
      remark: 'Nice one',
      question_id: 3,
    },
    {
      option_text: 'Some kind of elephant',
      is_correct: false,
      remark: 'How could you!',
      question_id: 3,
    },
  ])
}
