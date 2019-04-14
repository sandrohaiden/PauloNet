module.exports = (connection) => {

  var express = require('express');
  var router = express.Router();
  var controller = require('../controller/instalacao')(connection);

  /* GET home page. */
  router.post('/instalacao/:id', controller.step1);

  router.post('/instalacao/:id', controller.step2);

  return router;
}