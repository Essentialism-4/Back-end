const express = require('express');

const User = require('../models/users-model.js');

const router = express.Router();

const authenticate = require('../auth/auth-router')

// we would like this to be protected 
router.get('/', authenticate, (req, res) => {
    User.getAll()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
})

module.exports = router; 