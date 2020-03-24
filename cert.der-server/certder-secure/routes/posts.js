const express = require('express')
const router = express.Router()
const posts = require('../controllers/posts')

router.get('/', async (req, res) => {
    let response = ''
    let status = 200

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
    let response = ''
    let status = 200

    try {
        response = await posts.create(req.session.userId, req.body.Content)
    } catch (err) {
        console.log(err)
        status = 500
        response = err
    }
    
    return res.status(status).json(response)
})

router.put('/:id', async (req, res) => {
    let response = ''
    let status = 200

    try {
        const { admin } = req.session
        if (!admin) {
            status = 401
            response = { message: 'not authorized' }
        } else {
            response = await posts.pin(req.params.id)
        }
    } catch (err) {
        console.log(err)
        status = 500
        response = err
    }
    
    return res.status(status).json(response)
})

module.exports = router