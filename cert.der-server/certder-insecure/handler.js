'use strict';
const users = require('./users');
const posts = require('./posts');

exports.users = async (req, res) => {
  try {
    let response = '';

    switch (req.method) {
      case 'GET':
        response = await users.getAll(req.body);
        // const response = await users.get(req.path);
        return res.status(200).json({response: `GET! ${req.path}`});
      case 'POST':
        response = await users.create(req.body);
        return res.status(200).json({reponse: `POST! ${response}`});
      case 'PUT':
        response = await users.update(req.body);
        return res.status(200).json({response: `'PUT! ${response}`});
      default:
        return res.status(404).json({error: 'Not found!'});
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({error: err});
  }
};

exports.posts = async (req, res) => {
  try {
    let response = ''; 

    switch (req.method) {
      case 'GET':
        response = await posts.getAll(req.body);
        return res.status(200).json({reponse: `GET! ${response}`});
      case 'POST':
        response = await posts.create(req.body);
        return res.status(200).json({reponse: `POST! ${response}`});
      case 'PUT':
        response = await posts.update(req.body);
        return res.status(200).json({reponse: `PUT! ${response}`});
      default:
        return res.status(404).json({error: 'Not found!'});
    }
  } catch(err) {
    console.log(err)
    return res.status(500).json({error: err});
  }
};