module.exports = (connection) => {

  var express = require('express');
  var router = express.Router();
  var controller = require('../controller/chamado')(connection);

  /* GET home page. */
  router.get('/chamados', controller.get);

  router.get('/chamados/:id', controller.getChamadoById);

  router.post('/chamados/:id', controller.post);

  return router;
}