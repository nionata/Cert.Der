'use strict';

const cloudsql = require('./cloudsql');

exports.getAll = async () => {
    try {
        const db = await cloudsql();
        const res = await db.query('SELECT Posts.ID, Posts.Content, Posts.Pinned, Users.Username FROM Posts INNER JOIN Users ON Posts.UserID = Users.ID');
        let parsedRes = res.map(post => {
            post.Pinned = Boolean(post.Pinned);
            return post
        });

        return { message: '', posts: parsedRes }
    } catch (err) {
        throw err;
    }
}

exports.create = async (body) => {
    try {
        const db = await cloudsql();

        if (
            req.headers.cookie
            && parseCookies(req.headers.cookie).auth
            && (JSON.parse(parseCookies(req.headers.cookie).admin) == "1")
        )
        {
            const response = await db.query('INSERT INTO Posts SET ?', body);
            return { message: 'successfully created post', id: response.insertId };
        }
        else
        {
            return {
                message: 'Unable to create post. Are you an admin?'
            }
        }
    } catch (err) {
        throw err;
    }
}
