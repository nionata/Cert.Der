const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth')

let response = ''
let status = 200

router.get('/status', async (req, res) => {
    try {
      response = await auth.status(req)
    } catch (err) {
      console.log(err)
      status = 500
      response = err
    }
    
    return res.status(status).json(response)
})

router.post('/login', async (req, res) => {
    try {
      response = await auth.login(req.body)

      if (response.message.includes('successfully')) {
        req.session.id = response.id
        req.session.admin = Boolean(response.admin)
      } else {
        status = 406
      }
    } catch (err) {
      console.log(err)
      status = 500
      response = err
    }
    
    return res.status(status).json(response)
})

router.post('/signup', async (req, res) => {
    try {
      response = await auth.signup(req.body)
      req.session.id = response.id
      req.session.admin = Boolean(response.admin)
    } catch (err) {
      console.log(err)
      status = 500
      response = err
    }
    
    return res.status(status).json(response)
})

module.exports = router