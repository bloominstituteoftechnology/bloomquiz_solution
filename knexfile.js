const pg = require('pg')

if (process.env.NODE_ENV === 'production') {
  pg.defaults.ssl = { rejectUnauthorized: false }
}

const sqliteConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './backend/data/migrations' },
  seeds: { directory: './backend/data/seeds' },
  pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },
}

const postgresConfig = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: { directory: './backend/data/migrations' },
  seeds: { directory: './backend/data/seeds' },
  pool: { min: 2, max: 10 },
}

module.exports = {
  development: {
    ...sqliteConfig,
    connection: { filename: './backend/data/dev.db3' },
  },
  production: postgresConfig,
}
