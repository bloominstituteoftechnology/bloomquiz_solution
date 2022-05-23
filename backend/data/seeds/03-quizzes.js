exports.seed = async function (knex) {
  await knex('questions').insert([
    {
      question_title: 'Bilbo\'s Pocket',
      question_text: 'What\'s in Bilbo\'s pocket?',
    },
    {
      question_title: 'Meaning of Life',
      question_text: 'What is the meaning of life?',
    },
    {
      question_title: 'Closures',
      question_text: 'What is a closure?',
    },
    {
      question_title: 'Median of A Sorted, Even-Length Array of Numbers',
      question_text: 'The _median_ of a _sorted, even-length_ array of numbers is...',
    },
    {
      question_title: 'Models in Machine Learning',
      question_text: 'What is a __model__ in machine learning?',
    },
    {
      question_title: 'The Remember-Formulate-Predict Framework',
      question_text: 'How do humans think?',
    },
  ])
  await knex('options').insert([
    {
      option_text: 'The One Ring',
      is_correct: true,
      question_id: 1,
    },
    {
      option_text: 'Hand',
      is_correct: false,
      question_id: 1,
    },
    {
      option_text: 'Nothing',
      is_correct: false,
      question_id: 1,
    },
    {
      option_text: 'Family and friends',
      is_correct: true,
      question_id: 2,
    },
    {
      option_text: 'Work',
      is_correct: false,
      question_id: 2,
    },
    {
      option_text: 'Function object plus bindings',
      is_correct: true,
      question_id: 3,
    },
    {
      option_text: 'Some kind of elephant',
      is_correct: false,
      question_id: 3,
    },
    {
      option_text: "The average of the two middle elements",
      is_correct: true,
      question_id: 4,
    },
    {
      option_text: "The median of the two middle elements",
      is_correct: false,
      question_id: 4,
    },
    {
      option_text: "The mean of the two middle elements",
      is_correct: false,
      question_id: 4,
    },
    {
      option_text: "A representation of reality using a set of rules that mimic the existing data as closely as possible",
      is_correct: true,
      question_id: 5,
    },
    {
      option_text: "The data that represents the predictions that can be made about our rules",
      is_correct: false,
      question_id: 5,
    },
    {
      option_text: "Remember, formulate, predict",
      is_correct: true,
      question_id: 6,
    },
    {
      option_text: "Formulate, predict, remember.",
      is_correct: false,
      question_id: 6,
    },
    {
      option_text: "Predict, formulate, remember.",
      is_correct: false,
      question_id: 6,
    },
  ])
}
