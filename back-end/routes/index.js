const express = require('express');
const router = express.Router();
const userController = require('../controllers').user
const boardController = require('../controllers').board
const cardController = require('../controllers').card
const listController = require('../controllers').list
const authContoller = require('../controllers').auth
const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyToken');

//Auth

router.post('/api/auth/signup',[verifySignUp.checkDuplicateLogin], authContoller.signup)
router.post('/api/auth/signin', authContoller.sigin)

//User
router.get('/api/user/:id', [authJwt.verifyToken],userController.getById);
router.post('/api/user',[authJwt.verifyToken], userController.add);
router.put('/api/user/:id', [authJwt.verifyToken],userController.update);
router.delete('/api/user/:id',[authJwt.verifyToken], userController.delete);

//Board
router.get('/api/board',[authJwt.verifyToken], boardController.list);
router.get('/api/board/:id',[authJwt.verifyToken], boardController.getById);
router.post('/api/board',[authJwt.verifyToken], boardController.add);
router.put('/api/board/:id',[authJwt.verifyToken], boardController.update);
router.delete('/api/board/:id',[authJwt.verifyToken], boardController.delete);

//Card
router.get('/api/card', [authJwt.verifyToken],cardController.list);
router.get('/api/card/:id', [authJwt.verifyToken],cardController.getById);
router.post('/api/card',[authJwt.verifyToken], cardController.add);
router.put('/api/card/:id',[authJwt.verifyToken], cardController.update);
router.delete('/api/card/:id',[authJwt.verifyToken], cardController.delete);

//List
router.get('/api/list', [authJwt.verifyToken],listController.list);
router.get('/api/list/:id',[authJwt.verifyToken], listController.getById);
router.post('/api/list',[authJwt.verifyToken], listController.add);
router.put('/api/list/:id', [authJwt.verifyToken],listController.update);
router.delete('/api/list/:id', [authJwt.verifyToken],listController.delete);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
