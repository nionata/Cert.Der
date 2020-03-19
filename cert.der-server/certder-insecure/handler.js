'use strict';
const dotenv = require('dotenv').config();
const auth = require('./auth');
const users = require('./users');
const posts = require('./posts');

exports.auth = async (req, res) => {
  try {
    let response = '';
    let status = 200;

    if (req.method === 'POST') {
      if (req.path === '/login') {
        response = await auth.login(req.body);
        if (response.message.includes('successfully')) {
          res.setHeader('set-cookie', ['auth=true; Path=/', `id=${response.id}; Path=/`, `admin=${response.admin}; Path=/`]); 
        } else {
          status = 406;
        }
      }

      if (req.path === '/signup') {
        response = await auth.signup(req.body);
        res.setHeader('set-cookie', ['auth=true; Path=/', `id=${response.id}; Path=/`, `admin=${response.admin}; Path=/`]);
      }
    }

    if (response !== '') return res.status(status).json(response)
    return res.status(404).json({error: `${req.method} ${req.path} not found!`});
  } catch (err) {
    console.log(err)
    return res.status(500).json(err);
  }
}

exports.users = async (req, res) => {
  try {
    const authorized = await auth.authorizeRequest(req);
    if (!authorized) {
      return res.status(401).json({response: 'Authorization missing'})
    }

    let response = '';

    switch (req.method) {
      case 'GET':
        if (req.path === "/") {
          response = await users.getAll();
        } else {
          response = await users.get(req.path)
        }
        break;
      case 'POST':
        if (req.path === '/') response = await users.create(req.body);
        break;
      case 'PUT':
        if (req.path === '/') response = await users.updateImage(req.path, req.body);
        break;
    }

    if (response !== '') return res.status(200).json(response)
    return res.status(404).json({error: `${req.method} /users/${req.path} not found!`});
  } catch (err) {
    console.log(err)
    return res.status(500).json({error: JSON.parse(err)});
  }
};

exports.posts = async (req, res) => {
  try {
    const authorized = await auth.authorizeRequest(req);
    if (!authorized) {
      return res.status(401).json({response: 'Authorization missing'})
    }
    
    let response = ''; 

    switch (req.method) {
      case 'GET':
        if (req.path === '/') response = await posts.getAll();
        break;
      case 'POST':
        if (req.path === '/') response = await posts.create(req.body);
        break;
      case 'PUT':
        if (req.path !== '/') response = await posts.pin(req.path);
        break;
    }

    if (response !== '') return res.status(200).json(response)
    return res.status(404).json({error: `${req.method} /posts/${req.path} not found!`});
  } catch(err) {
    console.log(err)
    return res.status(500).json({error: JSON.parse(err)});
  }
};