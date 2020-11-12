const User = require('../models').User;

module.exports = {
  checkDuplicateLogin(req,res,next){
  return User
    .findOne({
      where: {
        login: req.body.login
      }
    })
    .then(user=>{
      if(user){
        return res.status(400).send('Fail. Login is already taken')
      }
      next();
    })
  }
}