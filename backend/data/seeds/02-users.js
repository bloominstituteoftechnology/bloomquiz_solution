exports.seed = async function (knex) {
  await knex('users').insert([
    {
      user_username: 'foo',
      user_email: 'foo@bar.baz',
      user_password: '$2a$12$oUAkEKugo6tEDtBrYMuztedRR858zReB3CJrAAjkBibSxf8jKw8ke',
    },
  ])
}
