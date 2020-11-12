const User = require('../models').User;
const secret = require('../config/secret')

const jwt = require('jsonwebtoken')


module.exports = {
  signup(req,res){
    return User
    .create({
      login: req.body.login,
      password: req.body.password,
    })
    .then(user => res.status(201).send(user))
      .catch(err => res.status(400).send(err))
  },
  sigin(req,res){
    return User
    .findOne({
      where:{
        login: req.body.login
      }
    }).then(user=>{
      if(!user){
        return res.status(404).send("User Not Found")
      }
      if(user.password !== req.body.password){
          return res.status(401).send({auth:false, accessToken: null, reason: "Invalid Password"})
      }
      const token = jwt.sign({id:user.id},secret.secret,{
        expiresIn:86400
      })
      res.status(200).send({auth:true,accessToken:token})
    }).catch(err=>{
      res.status(500).send(err)
    })
  }
}