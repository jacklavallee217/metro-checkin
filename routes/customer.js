var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const Customer = require('../models/Customer.model');
const Item = require('../models/Item.model');

var passItems = [];
var membershipItems = [];
var foodItems = [];
var gearItems = [];

router.post('/customer/:id', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST customer info */
router.post('/:id', function(req, res, next) {
  var id = new ObjectID(req.params.id);
  MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');
    var query = {_id: id};
    var update = { $set: {'customerInfo.note': req.body.notes, 'customerInfo.privilege': req.body.privilege} };
    dbo.collection('customers').updateOne(query, update);
    dbo.collection('customers').findOne(query, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.render('customer', {
        customer: result
      });
    })
  })
});

/* Admit Customer */
router.post('/:id/customerAdmitted', function(req, res, next) {
  var id = new ObjectID(req.params.id);
  MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');
    var query = {_id: id};
    var update = { $set: {'lastAdmitted': Date.now()}};
    dbo.collection('customers').updateOne(query, update);
    dbo.collection('customers').findOne(query, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.render('customer', {
        customer: result
      });
    })
  });
});


/* GET purchase page. */
router.get('/purchase/:id', function(req, res, next) {
  var id = new ObjectID(req.params.id);
  MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');
    dbo.collection('passItems').find({}).sort({order_num: 1}).toArray(function(err, result) {
      if (err) { throw err }
      else {
        for (i = 0; i < result.length; i++) {
          passItems[i] = result[i];
          console.log(passItems[i]);
        }
      }
    });
    dbo.collection('customers').findOne({_id: id}, function(err, result) {
      if (err) throw err;
      res.render('purchase', {
        customer: result,
        passItems: passItems
      });
    });
  });
});

module.exports = router;