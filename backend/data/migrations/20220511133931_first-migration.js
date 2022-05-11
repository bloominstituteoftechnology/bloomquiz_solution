exports.up = async function (knex) {
  await knex.schema.createTable('users', users => {
    users.increments();
    users.string('username', 255).notNullable().unique()
    users.string('password', 255).notNullable()
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('users')
}
