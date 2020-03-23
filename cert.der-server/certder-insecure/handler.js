'use strict';
const dotenv = require('dotenv').config();
const auth = require('./auth');
const users = require('./users');
const posts = require('./posts');

const { ORIGIN } = process.env;

exports.auth = async (req, res) => {
  console.log(req.path, req.headers, req.body);

  let response = '';
  let status = 200;
  res.setHeader('Access-Control-Allow-Origin', ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');

  try {
    switch (req.method) {
      case 'GET':
        if (req.path === '/status') response = await auth.status(req.headers);
      case 'POST':
        if (req.path === '/login') {
          response = await auth.login(req.body);
          if (response.message.includes('successfully')) {
            const cookieOptions = `Path=/; SameSite=None; Secure; Domain=`;
            res.setHeader('set-cookie', ['auth=true;'+cookieOptions, `id=${response.id};`+cookieOptions, `admin=${Boolean(response.admin)};`+cookieOptions]); 
          } else {
            status = 406;
          }
        }
  
        if (req.path === '/signup') {
          response = await auth.signup(req.body);
          res.setHeader('set-cookie', ['auth=true; Path=/', `id=${response.id}; Path=/`, `admin=${Boolean(response.admin)}; Path=/`]);
        }
        break;
      case 'OPTIONS':
        response = 'No content';
        status = 204;
        break;
    }

    if (response !== '') return res.status(status).json(response)
    return res.status(404).json({error: `${req.method} ${req.path} not found!`});
  } catch (err) {
    console.log(err)
    return res.status(500).json(err);
  }
}

exports.users = async (req, res) => {
  console.log(req.path, req.headers, req.body);

  let response = '';
  let status = 200;
  res.setHeader('Access-Control-Allow-Origin', ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');

  try {
    const authorized = await auth.authorizeRequest(req);
    if (req.method !== 'OPTIONS' && !authorized) {
      status = 401;
      return res.status(status).json({response: 'authorization missing'})
    }

    switch (req.method) {
      case 'GET':
        if (req.path !== "/") response = await users.get(req.path)
        break;
      case 'POST':
        if (req.path === '/') response = await users.create(req.body);
        break;
      case 'PUT':
        if (req.path !== '/') response = await users.updateImage(req.path, req.body);
        break;
      case 'OPTIONS':
        response = 'No content';
        status = 204;
        break;
    }

    if (response !== '') return res.status(status).json(response)
    return res.status(404).json({error: `${req.method} /users${req.path} not found!`});
  } catch (err) {
    console.log(err)
    return res.status(500).json(err);
  }
};

exports.posts = async (req, res) => {
  console.log(req.path, req.headers, req.body);

  let response = '';
  let status = 200; 
  res.setHeader('Access-Control-Allow-Origin', ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');

  try {
    const authorized = await auth.authorizeRequest(req);
    if (req.method !== 'OPTIONS' && !authorized) {
      status = 401;
      return res.status(status).json({response: 'authorization missing'})
    }

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
      case 'OPTIONS':
        response = 'No content';
        status = 204;
        break;
    }

    if (response !== '') return res.status(status).json(response);
    return res.status(404).json({error: `${req.method} /posts${req.path} not found!`});
  } catch(err) {
    console.log(err)
    return res.status(500).json(err);
  }
};