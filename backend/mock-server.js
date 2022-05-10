const { setupServer } = require('msw/node')
const { rest } = require('msw')

const help = require('./helpers')
// 1
async function login(req, res, ctx) {
  const [status, payload] = await help.login(req.body)
  return res(
    ctx.status(status),
    ctx.json(payload),
  )
}
// 2
async function getArticles(req, res, ctx) {
  const token = req.headers.get('authorization')
  const [status, payload] = await help.getArticles(token)
  return res(
    ctx.status(status),
    ctx.json(payload),
  )
}
// 3
async function postArticle(req, res, ctx) {
  const token = req.headers.get('authorization')
  const [status, payload] = await help.postArticle(token, req.body)
  return res(
    ctx.status(status),
    ctx.json(payload),
  )
}
// 4
async function updateArticle(req, res, ctx) {
  const token = req.headers.get('authorization')
  const [status, payload] = await help.updateArticle(token, req.body, req.params.article_id)
  return res(
    ctx.status(status),
    ctx.json(payload),
  )
}
// 5
async function deleteArticle(req, res, ctx) {
  const token = req.headers.get('authorization')
  const [status, payload] = await help.deleteArticle(token, req.params.article_id)
  return res(
    ctx.status(status),
    ctx.json(payload),
  )
}
// 404
function catchAll(req, res, ctx) {
  const message = `Endpoint [${req.method}] /${req.params['0']} does not exist`
  return res(
    ctx.status(404),
    ctx.json({ message }),
  )
}

const getHandlers = () => {
  help.reset()
  return [
    rest.post('http://localhost:9000/api/login', login),
    rest.get('http://localhost:9000/api/articles', getArticles),
    rest.post('http://localhost:9000/api/articles', postArticle),
    rest.put('http://localhost:9000/api/articles/:article_id', updateArticle),
    rest.delete('http://localhost:9000/api/articles/:article_id', deleteArticle),
    rest.all('http://localhost:9000/*', catchAll),
  ]
}

module.exports = {
  setupServer,
  getHandlers,
}
