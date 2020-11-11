const User = require('../models').User
const Board = require('../models').Board

module.exports = {
  getById(req, res) {
    return User
      .findByPk(req.params.id, {
        include: [{
          model: Board,
          as: 'boards'
        }]
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          })
        }
        return res.status(200).send(user)
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err)
      });
  },
  add(req, res) {
    return User
      .create({
        login: req.body.login,
        password: req.body.password,
      })
      .then(user => res.status(201).send(user))
      .catch(err => res.status(400).send(err))
  },
  update(req, res) {
    return User
      .findByPk(req.params.id, {
        include: [{
          model: Board,
          as: 'boards'
        }],
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found'
          })
        }
        return user
          .update({
            login: req.body.login || user.login,
            password: req.body.password || user.password
          })
          .then(() => res.status(200).send(user))
          .catch(err => res.status(400).send(err))
      })
  },
  delete(req,res){
    return User
    .findByPk(req.params.id,{
      include: [{
        model: Board,
        as: 'boards'
      }]
    })
    .then(user=> {
      if(!user){
        return res.status(400).send({
          message: 'User not found'
        })
      }
      return user
      .destroy()
      .then(()=>res.status(204).send())
      .catch(err=>res.status(400).send(err))
    })
  }

};