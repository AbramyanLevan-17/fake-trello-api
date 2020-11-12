const Board = require('../models').Board;
const User = require('../models').User;
const Card = require('../models').Card;

module.exports ={
  list(req,res) {
    return Board
    .findAll({
      include: [{
        model: User,
        as: 'user'
      },{
        model: Card,
        as: 'cards'
      }],
    })
    .then(boards=>res.status(200).send(boards))
    .catch(err=>{res.status(400).send(err)})
  },
  getById(req,res){
    return Board
    .findByPk(req.params.id,{
      include:[{
        model: User,
        as: 'user'
      },{
        model:Card,
        as:'cards'
      }]
    })
    .then(board=>{
      if(!board){
        return res.status(404).send({
          message:"Board Not Found",
        })
      }
      return res.status(200).send(board)
    })
    .catch(err=>res.status(400).send(err))
  },
  add(req,res){
    return Board
    .create({
      board_name: req.body.board_name,
      user_id: req.body.user_id,
    })
    .then(board=>res.status(201).send(board))
    .catch(err=>res.status(400).send(err))
  },
  update(req,res){
    return Board
    .findByPk(req.params.id,{
      include:[{
        model:User,
        as: 'user'
      },{
        model: Card,
        as: 'cards'
      }]
    })
    .then(board=>{
      if(!board){
        return res.status(404).send({
          message: 'Board Not Found'
        })
      }
      return board
      .update({
        board_name: req.body.board_name || board.board_name,
        user_id: req.body.user_id || board.user_id
      })
      .then(()=>res.status(200).send(board))
      .catch(err=>res.status(400).send(err))
    })
  },
  delete(req,res){
    return Board
    .findByPk(req.params.id,{
      include: [{
        model: Card,
        as: 'cards'
      }]
    })
    .then(board=>{
      if(!board){
        return res.status(404).send({
          message: 'Board Not Found'
        })
      }
      return board
      .destroy()
      .then(()=> res.status(204).send({
        message:'Was succesfully deleted'
      }))
      .catch(err=>res.status(400).send(err))
    })
  }
}
