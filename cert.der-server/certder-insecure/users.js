'use strict';

const cloudsql = require('./cloudsql');

exports.get = async (path) => {
    const splitPath = path.split('/')
    if (splitPath.length !== 2) return { messsage: 'invalid user path' }

    const id = parseInt(splitPath[1])
    if (isNaN(id)) return { message: 'invalid user id type' }

    try {
        const db = await cloudsql();
        const res = await db.query('SELECT ID, Username, Admin, ProfilePic FROM Users WHERE ID = ?', [id]);
        if (!res || !res.length) return { message: 'user not found' };

        return { message: '', user: res };
    } catch (err) {
        throw err;
    }
}

exports.updateImage = async (path, body) => {
    const splitPath = path.split('/')
    if (splitPath.length !== 2) return { messsage: 'invalid user path' }

    const id = parseInt(splitPath[1])
    if (isNaN(id)) return { message: 'invalid user id type' }

    try {
        const db = await cloudsql();
        const res = await db.query('SELECT ID, Username, Admin, ProfilePic FROM Users WHERE ID = ?', [id]);
        if (!res || !res.length) return { message: 'user not found' };

        const update = await db.query('UPDATE Users SET ProfilePic = ? WHERE ID = ?', [body.ProfilePic, id]);
        console.log('update', update);
        
        return { message: 'successfully updated profile picture' };
    } catch (err) {
        throw err;
    }
}