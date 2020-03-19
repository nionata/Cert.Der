'use strict';
const auth = require('./auth');
const users = require('./users');
const posts = require('./posts');

exports.auth = async (req, res) => {
  try {
    let response = '';

    if (req.method === 'POST') {
      if (req.path === '/login') {
        response = await auth.login(req.body);
      }

      if (req.path === '/signup') {
        response = await auth.signup(req.body);
      }
    }

    if (response !== '') return res.state(200).json(response)
    return res.status(404).json({error: `${req.method} ${req.path} not found!`});
  } catch (err) {
    console.log(err)
    return res.status(500).json({error: err});
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

    if (response !== '') return res.status(200).json(response);
    return res.status(404).json({error: `${req.method} ${req.path} not found!`});
  } catch (err) {
    console.log(err)
    return res.status(500).json({error: err});
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

    if (response !== '') return res.status(200).json(response);
    return res.status(404).json({error: `${req.method} ${req.path} not found!`});
  } catch(err) {
    console.log(err)
    return res.status(500).json({error: err});
  }
};