const express = require('express')
const cors = require('cors')
const path = require('path')
const helmet = require('helmet')

const questionsRouter = require('./api/questions/questions-router')
const authRouter = require('./api/auth/auth-router')
const quizzesRouter = require('./api/quizzes/quizzes-router')
const statsRouter = require('./api/stats/stats-router')

const { processToken, only } = require('./api/auth/auth-middleware')

const server = express()
server.use(express.json())
server.use(express.static(path.join(__dirname, '../dist')))
server.use(cors())
server.use(helmet())

server.use(processToken)
server.use('/api/questions', only(1), questionsRouter)
server.use('/api/auth', authRouter)
server.use('/api/quizzes', quizzesRouter)
server.use('/api/stats', statsRouter)

// SPA
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})
// 404
server.use((req, res) => {
  res.status(404).json({
    message: `Endpoint [${req.method}] ${req.originalUrl} does not exist`,
  })
})
// ERR
server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    error: 'Something bad happened',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = server
