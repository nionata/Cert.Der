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
        console.log(getCookie("admin"))
        if(getCookie("admin")=="1")
        {
            const response = await db.query('INSERT INTO Posts SET ?', body);
            return { message: 'successfully created post', id: response.insertId };
        }
    } catch (err) {
        throw err;
    }
}

function getCookie(cname) 
{
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) 
    {
        var c = ca[i];
        while (c.charAt(0) == ' ') 
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) 
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
