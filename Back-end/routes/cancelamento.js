module.exports = (connection) => {

    var express = require('express');
    var router = express.Router();
    var controller = require('../controller/cancelamento')(connection);
  
    /* GET home page. */
    router.post('/cancelamento/:id', controller.post);
  
    return router;
  }