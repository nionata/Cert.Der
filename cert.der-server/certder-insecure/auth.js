'use strict';

// const uuid = require("uuid"); maybe for better sec
const bcrypt = require('bcryptjs');
const cloudsql = require('./cloudsql');

const parseCookies = (cookie) => {
    let rx = /([^;=\s]*)=([^;]*)/g;
    let obj = { };
    for ( let m ; m = rx.exec(cookie) ; )
      obj[ m[1] ] = decodeURIComponent( m[2] );
    return obj;
}

exports.authorizeRequest = async (req) => {
    // Session/Cookie Hijack/Spoof
    // Need to store session ID and encrypt
    console.log(req.headers);
    console.log(req.headers.cookie);
    
    if (req.headers.cookie && parseCookies(req.headers.cookie).auth && JSON.parse(parseCookies(req.headers.cookie).auth)) {
        return true;
    }

    return false;
}

// exports.isAdmin = async (req) => {
//     // How could this ever be spoofed??
//     console.log(req.headers);
//     console.log(req.headers.cookie);
    
//     if (req.headers.cookie && JSON.parse(parseCookies(req.headers.cookie).admin)) {
//         return true;
//     }

//     return false;
// }

exports.login = async (body) => {
    // TODO: Input validation

    try {
        const db = await cloudsql();
        const res = await db.query('SELECT ID, Password, Admin FROM Users WHERE Username = ?', [body.Username]);

        // Insecure err msg
        if (!res || !res.length) return { message: 'that username does not exist' };

        const { ID, Password, Admin } = res[0]
        const isAuthenticated = await bcrypt.compare(body.Password, Password);
        if (isAuthenticated) return { message: 'successfully signed in user', id: ID, admin: Admin };

        // Insecure err msg
        return { message: 'that password is incorrect' };
    } catch (err) {
        throw err;
    }
};

exports.signup = async (body) => {
    // TODO: Input validation
    body.Password = await bcrypt.hash(body.Password, 10);

    try {
        const db = await cloudsql();
        // check if username is a duplicate 
        const response = await db.query('INSERT INTO Users SET ?', body);
        return { message: 'successfully created user', id: response.insertId, admin: body.Admin };
    } catch (err) {
        throw err;
    }
};