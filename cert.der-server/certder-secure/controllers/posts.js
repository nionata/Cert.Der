'use strict'

const cloudsql = require('../utils/cloudsql')

exports.getAll = async () => {
    try {
        const db = await cloudsql()
        const res = await db.query('SELECT Posts.ID, Posts.Content, Posts.Pinned, Users.Username, Users.ProfilePic FROM Posts INNER JOIN Users ON Posts.UserID = Users.ID')
        let parsedRes = res.map(post => {
            post.Pinned = Boolean(post.Pinned)
            return post
        })

        return { message: '', posts: parsedRes }
    } catch (err) {
        throw err
    }
}

exports.create = async (body) => {
    try {
        const db = await cloudsql()
        const response = await db.query('INSERT INTO Posts SET ?', body)

        return { message: 'successfully created post', id: response.insertId }
    } catch (err) {
        throw err
    }
}

exports.pin = async (rawPath) => {
    const id = parseInt(rawPath)
    if (isNaN(id)) return { message: 'invalid post id type' }

    try {
        const db = await cloudsql()
        const res = await db.query('SELECT * FROM Posts WHERE ID = ?', [id])
        if (!res || !res.length) return { message: 'post not found' }

        const update = await db.query('UPDATE Posts SET Pinned = IF(Id = ?, 1, 0)', [id])
        console.log('update', update)
        
        return { message: `successfully pinned post` }
    } catch (err) {
        throw err
    }
}