'use strict'

// const { v1 } = require('uuid')
const bcrypt = require('bcryptjs')
const cloudsql = require('../utils/cloudsql')
const { PEPPER } = process.env

exports.status = async (req) => {
    try {
        let { userId, admin } = req.session

        if (typeof userId === 'undefined') userId = null
        if (typeof admin === 'undefined') admin = null

        return { message: '', status: { userId, admin } }
    } catch (err) {
        throw err      
    }
}

exports.login = async (body) => {
    // TODO: Input validation

    try {
        const db = await cloudsql()
        const res = await db.query('SELECT ID, Password, Admin FROM Users WHERE Username = ?', [body.Username])

        // Insecure err msg
        if (!res || !res.length) return { message: 'that username does not exist' }

        const { ID, Password, Admin } = res[0]
        const isAuthenticated = await bcrypt.compare(PEPPER + body.Password, Password)
        if (isAuthenticated) return { message: 'successfully signed in user', id: ID, admin: Admin }

        // Insecure err msg
        return { message: 'that password is incorrect' }
    } catch (err) {
        throw err
    }
}

exports.signup = async (body) => {
    // TODO: Input validation
    body.Password = await bcrypt.hash(PEPPER + body.Password, 10)

    try {
        const db = await cloudsql()
        // body.ID = v1()
        const response = await db.query('INSERT INTO Users SET ?', body)
        
        return { message: 'successfully created user', id: response.insertId, admin: body.Admin }
    } catch (err) {
        throw err
    }
}