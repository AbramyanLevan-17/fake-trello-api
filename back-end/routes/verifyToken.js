const jwt = require('jsonwebtoken')
const secret = require('../config/secret')
const User = require('../models').User;

module.exports = {
  verifyToken(req,res,next){
    const token = req.headers['x-access-token']

    if(!token){
      return res.status(403).send({
        auth:false, message: 'No token'
      })
    }
    jwt.verify(token,secret.secret, (err,decoded)=>{
      if (err){
        return res.status(500).send({ 
            auth: false, 
            message: 'Fail to Authentication. Error -> ' + err 
          });
      }
      req.userId = decoded.id;
      next();
    });
  }
}