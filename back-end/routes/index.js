const express = require('express');
const router = express.Router();
const userController = require('../controllers').user
const boardController = require('../controllers').board
const cardController = require('../controllers').card
const listController = require('../controllers').list


//User
router.get('/api/user/:id', userController.getById);
router.post('/api/user', userController.add);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.delete);

//Board
router.get('/api/board', boardController.list);
router.get('/api/board/:id', boardController.getById);
router.post('/api/board', boardController.add);
router.put('/api/board/:id', boardController.update);
router.delete('/api/board/:id', boardController.delete);

//Card
router.get('/api/card', cardController.list);
router.get('/api/card/:id', cardController.getById);
router.post('/api/card', cardController.add);
router.put('/api/card/:id', cardController.update);
router.delete('/api/card/:id', cardController.delete);

//List
router.get('/api/list', listController.list);
router.get('/api/list/:id', listController.getById);
router.post('/api/list', listController.add);
router.put('/api/list/:id', listController.update);
router.delete('/api/list/:id', listController.delete);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
