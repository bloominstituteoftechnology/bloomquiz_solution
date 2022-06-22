import db from '../../data/db-config'
import server from './../../server'
import request from 'supertest'

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

test('environmnet', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})
describe('[POST] /api/auth/login', () => {
  test('responds with message and token on successful login', async () => {

  })
  test('responds with status 401 and error message on bad credentials', async () => {

  })
})
