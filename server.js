const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./routers/users-router.js');
const valuesRouter = require('./routers/values-router.js');

const restrict = require('./auth/restricted-middleware.js')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', restrict, usersRouter);
server.use('/api/values', restrict, valuesRouter);

server.get('/', (req, res) => {
  res.send("You've reached the Essentialism back end!");
});

module.exports = server;
