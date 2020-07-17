var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

router.post('/purchaseHistory', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;