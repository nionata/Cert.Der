'use strict';

const cloudsql = require('./cloudsql');

exports.getAll = async () => {
    try {
        const db = await cloudsql();
        const res = await db.query('SELECT Posts.ID, Posts.Content, Posts.Pinned, Users.Username FROM Posts INNER JOIN Users ON Posts.UserID = Users.ID');

        return { message: '', users: res }
    } catch (err) {
        throw err;
    }
}

exports.create = async (body) => {
    try {
        const db = await cloudsql();
        const response = await db.query('INSERT INTO Posts SET ?', body);

        return { message: 'successfully created post', id: response.insertId };
    } catch (err) {
        throw err;
    }
}

exports.pin = async (path) => {
    const splitPath = path.split('/')
    if (splitPath.length !== 2) return { messsage: 'invalid post path' }

    const id = parseInt(splitPath[1])
    if (isNaN(id)) return { message: 'invalid post id type' }

    try {
        const db = await cloudsql();
        const res = await db.query('SELECT Pinned FROM Posts WHERE ID = ?', [id]);
        if (!res || !res.length) return { message: 'post not found' };

        const { Pinned } = res[0];
        const update = await db.query('UPDATE Posts SET Pinned = ? WHERE ID = ?', [!Pinned, id]);
        console.log('update', update);
        
        return { message: `successfully ${!Pinned ? 'pinned' : 'unpinned'} post` };
    } catch (err) {
        throw err;
    }
}