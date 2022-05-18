const development = {
  client: 'sqlite3',
  connection: { filename: './backend/data/dev.db3' },
  migrations: { directory: './backend/data/migrations' },
  seeds: { directory: './backend/data/seeds' },
  pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },
  useNullAsDefault: true,
}

const production = {
  client: 'sqlite3',
  connection: { filename: './backend/data/prod.db3' },
  migrations: { directory: './backend/data/migrations' },
  seeds: { directory: './backend/data/seeds' },
  pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },
  useNullAsDefault: true,
}

module.exports = {
  development,
  production,
}
