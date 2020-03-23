const express = require('express')
const router = express.Router()
const posts = require('../controllers/posts')

let response = ''
let status = 200

router.get('/', async (req, res) => {
    try {
        response = await posts.getAll()
    } catch (err) {
        console.log(err)
        status = 500
        response = err
    }
    
    return res.status(status).json(response)
})

router.post('/', async (req, res) => {
    try {
        response = await posts.create(req.body)
    } catch (err) {
        console.log(err)
        status = 500
        response = err
    }
    
    return res.status(status).json(response)
})

router.put('/:id', async (req, res) => {
    try {
        response = await posts.pin(req.params.id)
    } catch (err) {
        console.log(err)
        status = 500
        response = err
    }
    
    return res.status(status).json(response)
})

module.exports = router