exports.seed = async function (knex) {
  await knex('roles').insert([
    { role_name: 'admin' },
    { role_name: 'user' },
  ])
  await knex('users').insert([
    {
      username: 'admin',
      password: '$2a$12$oUAkEKugo6tEDtBrYMuztedRR858zReB3CJrAAjkBibSxf8jKw8ke',
      role_id: 1
    },
  ])
}
