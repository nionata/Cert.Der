'use strict'
// Imports
const express = require('express')
const session = require('express-session')
const cors = require('cors')
require('dotenv').config()
const { ORIGIN, SESSION_SECRET } = process.env

// Configuring Middleware
const app = express()

const coorsOptions = {
  origin: ORIGIN,
  credentials: true
}
const sessionOptions = {
  secret: SESSION_SECRET,
  cookie: {
    secure: true
  }
}

app.use(cors(coorsOptions))
app.use(session(sessionOptions))

// Routers
const auth = require('./routes/auth')
const users = require('./routes/users')
const posts = require('./routes/posts')

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  console.log(`session ${req.session}`)
  next()
})

app.use('/auth', auth)
app.use('/users', users)
app.use('/posts', posts)

app.use(async (req, res) => {
  return res.status(404).json({ error: `${req.method} ${req.path} not found!` })
})

exports.secure = app