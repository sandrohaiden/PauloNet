module.exports = (connection) => {

  var express = require('express');
  var router = express.Router();
  var controller = require('../controller/atendimento')(connection);

  /* GET home page. */
  router.get('/:tec', controller.get);

  router.get('/:id', controller.getChamadoById);

  router.post('/:chamado', controller.post);

  router.post('/instalacao/:chamado', controller.postInst);

  router.post('/instalacao2/:chamado', controller.postInst2);

  return router;
}