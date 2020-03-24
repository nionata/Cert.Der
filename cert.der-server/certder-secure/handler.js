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
    // secure: true,
    sameSite: 'none'
  }
}

app.use(cors(coorsOptions))
app.use(session(sessionOptions))

// Routers
const auth = require('./routes/auth')
const users = require('./routes/users')
const posts = require('./routes/posts')

// Middleware logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  console.log(`session ${JSON.stringify(req.session)}`)
  next()
})

app.use('/auth', auth)

// Security check
app.use((req, res, next) => {
  const { userId, admin } = req.session

  if (typeof userId === 'undefined' && typeof admin === 'undefined') {
    return res.status(401).json({ message: 'missing authorization' })
  } else {
    next()
  }
})

app.use('/users', users)
app.use('/posts', posts)

app.use(async (req, res) => {
  return res.status(404).json({ error: `${req.method} ${req.path} not found!` })
})

exports.secure = app