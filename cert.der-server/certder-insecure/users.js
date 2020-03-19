'use strict';

const cloudsql = require('./cloudsql');

exports.getAll = async () => {
    try {
        const db = await cloudsql();
        const res = await db.query('SELECT ID, Username, Admin, ProfilePic FROM Users');

        return { message: '', users: res }
    } catch (err) {
        throw err;
    }
}

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
    return {'update': path+body};
}