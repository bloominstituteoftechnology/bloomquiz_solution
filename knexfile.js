const sharedConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './backend/data/migrations' },
  pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },
}

module.exports = {
  development: {
    ...sharedConfig,
    connection: { filename: './backend/data/dev.db3' },
    seeds: { directory: './backend/data/seeds' },
  },
  testing: {
    ...sharedConfig,
    connection: { filename: './backend/data/test.db3' },
  },
  production: {
    ...sharedConfig,
    connection: { filename: './backend/data/test.db3' },
  },
}
