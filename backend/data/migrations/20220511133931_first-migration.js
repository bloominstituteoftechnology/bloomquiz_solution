exports.up = async function (knex) {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.timestamps(false, true)
      users.string('user_username', 200).notNullable().unique()
      users.string('user_email', 320).notNullable().unique()
      users.string('user_password', 100).notNullable().unique()
    })
    .createTable('questions', (questions) => {
      questions.increments('question_id')
      questions.timestamps(false, true)
      questions.string('question_title', 100).notNullable()
      questions.string('question_text', 500).notNullable()
      questions.string('question_hint', 500)
    })
    .createTable('options', (options) => {
      options.increments('option_id')
      options.timestamps(false, true)
      options.string('option_text', 500).notNullable()
      options.string('option_remark', 500)
      options.boolean('is_distractor')
      options.integer('question_id')
        .unsigned()
        .notNullable()
        .references('question_id')
        .inTable('questions')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
    })
}

exports.down = async function (knex) {
  await knex.schema
    .dropTableIfExists('options')
    .dropTableIfExists('questions')
    .dropTableIfExists('users')
}
