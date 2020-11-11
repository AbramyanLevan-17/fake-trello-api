const Card = require('../models').Card;
const List = require('../models').List;

module.exports = {
  list(req,res){
    return List
    .findAll({
      include: [{
        model: Card,
        as: 'card'
      }]
    })
    .then(lists=>res.status(200).send(lists))
    .catch(err=>res.status(400).send(err));
  },

  getById(req,res){
    return List
    .findByPk(req.params.id,{
      include: [{
        model: Card,
        as: 'card'
      }]
    })
    .then(list=>{
      if(!list){
        return res.status(404).send({
          message: 'List Not Found'
        })
      }
      return res.status(200).send(list)
    })
    .catch(err=>res.status(400).send(err))
  },

  add(req,res){
    return List
    .create({
      list_name: req.body.list_name,
      description:req.body.description,
      card_id:req.body.card_id,
    })
    .then(list=>res.status(201).send(list))
    .catch(err=>res.status(400).send(err))
  },
  update(req,res){
    return List
    .findByPk(req.params.id,{
      include:[{
        model: Card,
        as: 'card'
      }]
    })
    .then(list=>{
      if(!list){
        return res.status(404).send({
          message: "List Not Found"
        })
      }
      return list
      .update({
        list_name: req.body.list_name || list.list_name,
        description: req.body.description || list.description,
        card_id: req.body.card_id || list.card_id,
      })
      .then(()=>res.status(200).send(list))
      .catch(err=>res.status(400).send(err))
    })
    .catch(err=>res.status(400).send(err))
  },

  delete(req,res){
    return List
    .findByPk(req.params.id)
    .then(list=>{
      if(!list){
        return res.status(404).send({
          message: 'List Not Found'
        })
      }
      return list
      .destroy()
      .then(()=>res.status(204).send({
        message:'Was succesfully deleted'
      }))
      .catch(err=>res.status(400).send(err))
    })
    .catch(err=>res.status(400).send(err))
  }
}