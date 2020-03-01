const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../models/users-model.js');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js')

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.insert(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.getByID({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        authorization = token;


        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) { // NEW 
const payload = {
  username: user.username,
  subject: user.id,
  department: user.department,
};

const options = {
  expiresIn: '2h'
}

  return jwt.sign(payload,secrets.jwtSecret,options);
}

module.exports = router;
