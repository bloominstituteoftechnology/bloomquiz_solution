const pg = require('pg')

if (process.env.NODE_ENV === 'production') {
  pg.defaults.ssl = { rejectUnauthorized: false }
}

const development = {
  client: 'sqlite3',
  connection: { filename: './backend/data/dev.db3' },
  migrations: { directory: './backend/data/migrations' },
  seeds: { directory: './backend/data/seeds' },
  pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },
  useNullAsDefault: true,
}

const production = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: { directory: './backend/data/migrations' },
  seeds: { directory: './backend/data/seeds' },
  pool: { min: 2, max: 10 },
}

module.exports = {
  development,
  production,
}
