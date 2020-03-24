const express = require('express')
const router = express.Router()
const users = require('../controllers/users')

router.get('/:id', async (req, res) => {
    let response = ''
    let status = 200

    try {
        response = await users.get(req.params.id)
    } catch (err) {
        console.log(err)
        status = 500
        response = err
    }
    
    return res.status(status).json(response)
})

router.post('/search', async (req, res) => {
    let response = ''
    let status = 200

    try {
        response = await users.search(req.body)
    } catch (err) {
        console.log(err)
        status = 500
        response = err
    }
    
    return res.status(status).json(response)
})

router.put('/', async (req, res) => {
    let response = ''
    let status = 200
    
    try {
        response = await users.updateImage(req.session.userId, req.body)
    } catch (err) {
        console.log(err)
        status = 500
        response = err
    }
    
    return res.status(status).json(response)
})

module.exports = router