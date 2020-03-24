'use strict'

const cloudsql = require('../utils/cloudsql')

exports.get = async (rawId) => {
    const id = parseInt(rawId)
    if (isNaN(id)) return { message: 'invalid user id type' }

    try {
        const db = await cloudsql()
        const res = await db.query('SELECT ID, Username, Admin, ProfilePic FROM Users WHERE ID = ?', [id])
        if (!res || !res.length) return { message: 'user not found' }

        return { message: '', user: res }
    } catch (err) {
        throw err
    }
}

exports.search = async (body) => {
    try {
        const { user } = body
        const db = await cloudsql()
        const res = await db.query('SELECT ID, Username, Admin, ProfilePic FROM Users WHERE Username = ?', [user])
        if (!res || !res.length) return { message: 'user not found' }

        return { message: '', user: res}
    } catch (err) {
        throw err
    }
}

exports.updateImage = async (rawId, body) => {
    const id = parseInt(rawId)
    if (isNaN(id)) return { message: 'invalid user id type' }

    try {
        const db = await cloudsql()
        const res = await db.query('SELECT ID, Username, Admin, ProfilePic FROM Users WHERE ID = ?', [id])
        if (!res || !res.length) return { message: 'user not found' }

        const update = await db.query('UPDATE Users SET ProfilePic = ? WHERE ID = ?', [body.ProfilePic, id])
        console.log('update', update)
        
        return { message: 'successfully updated profile picture' }
    } catch (err) {
        throw err
    }
}