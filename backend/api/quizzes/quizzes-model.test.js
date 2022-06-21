import db from '../../data/db-config'

jest.setTimeout(750)

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async () => {
  await db.destroy()
})
beforeEach(async () => {
  await db.seed.run()
})

describe('thing', () => {
  test('environmnet', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})
