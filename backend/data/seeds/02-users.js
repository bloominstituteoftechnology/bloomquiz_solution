exports.seed = async function (knex) {
  await knex('users').insert([
    {
      username: 'foo',
      password: '$2a$12$oUAkEKugo6tEDtBrYMuztedRR858zReB3CJrAAjkBibSxf8jKw8ke',
    },
  ])
}
