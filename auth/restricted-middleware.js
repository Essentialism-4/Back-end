//Imports
// ==============================================================================================
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js')
// ==============================================================================================



//Exporting token validator middleware
// ==============================================================================================
module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        //foul play
        res.status(418).json({message: "Token compromised"})
      } else {
        //token is good
        req.user = { 
          username: decodedToken.username, 
          department: decodedToken.department  
        }; 
        
        next();
      }
    })
  } else {
    res.status(400).json({ message: 'Token not working' });
  }
};
// ==============================================================================================
