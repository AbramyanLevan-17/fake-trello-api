const Card = require('../models').Card;
const Board = require('../models').Board;
const List = require('../models').List;

module.exports = {
  list(req,res){
    return Card
    .findAll({
      include:[{
        model: List,
        as: 'lists'
      }]
    })
    .then(card=> res.status(200).send(card))
    .catcn(err=> res.status(400).send(err));
  },
  getById(req,res){
    return Card
    .findByPk(req.params.id,{
      include:[{
        model: List,
        as: 'lists'
      },{
        model: Board,
        as: 'board'
      }]
    })
    .then(card=>{
      if(!card){
        return res.status(404).send({
          message:'Card Not Found'
        })
      }
      return res.status(200).send(card)
    })
    .catch(err=>res.status(400).send(err))
  },
  add(req,res){
    return Card
    .create({
      card_name: req.body.card_name,
      board_id: req.body.board_id
    })
    .then(card=>res.status(201).send(card))
    .catch(err=>res.status(400).send(err))
  },
  update(req,res){
    return Card
    .findByPk(req.params.id,{
      include:[{
        model: List,
        as: "lists"
      }]
    })
    .then(card=>{
      if(!card){
        return res.status(404).send({
          message: 'Card Not Found'
        })
      }
      return card
      .update({
        card_name: req.body.card_name || card.card_name
      })
      .then(()=>res.status(200).send(card))
      .catch(err=>res.status(400).send(err))
    })
  },
  delete(req,res){
    return Card
    .findByPk(req.params.id,{
      include: [{
        model: List,
        as: 'lists'
      }]
    })
    .then(card=>{
      if(!card){
        return res.status(404).send({
          message: 'Card Not Found'
        })
      }
      return card
      .destroy()
      .then(()=>res.status(200).send({
        message:'Was succesfully deleted'
      }))
      .catch(err=>res.status(400).send(err))
    })
    .catch(err=>res.status(400).send(err))
  }
}