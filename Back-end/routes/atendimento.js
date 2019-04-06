module.exports = (connection) => {

  var express = require('express');
  var router = express.Router();
  var controller = require('../controller/atendimento')(connection);

  /* GET home page. */
  router.get('/', controller.get);

  router.get('/:id', controller.getChamadoById);

  router.post('/:chamado', controller.post);

  router.post('/instalacao/:chamado', controller.postInst);

  return router;
}