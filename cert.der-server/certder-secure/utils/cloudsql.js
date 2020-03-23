'use strict'

const mysql = require('promise-mysql')
const { DB_USER, DB_PASS, DB_NAME, CLOUD_SQL_CONNECTION_NAME } = process.env

module.exports = () => mysql.createPool({
    user: DB_USER,
    password: DB_PASS, 
    database: DB_NAME,
    socketPath: `/cloudsql/${CLOUD_SQL_CONNECTION_NAME}`,
    connectionLimit: 1,
})