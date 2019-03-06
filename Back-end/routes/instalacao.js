module.exports = (connection) => {

  var express = require('express');
  var router = express.Router();
  var controller = require('../controller/instalacao')(connection);

  /* GET home page. */
  router.get('/', controller.get);

  router.get('/:id', controller.getById);

  return router;
}