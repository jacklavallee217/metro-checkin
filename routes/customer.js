var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const Customer = require('../models/Customer.model');
const Item = require('../models/Item.model');
const CardInfo = require('../models/CardInfo.model');

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

/* GET personal info page. */
router.get('/personalInfo/:id', function(req, res, next) {
  var id = new ObjectID(req.params.id);
  MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');
    dbo.collection('customers').findOne({_id: id}, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.render('personalInfo', {
        customer: result
      });
    });
  });
})


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

/* GET purchase history page */
router.get('/purchaseHistory/:id', function(req, res, next) {
  var id = new ObjectID(req.params.id);
  MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');
    dbo.collection('customers').findOne({_id: id}, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.render('purchaseHistory', {
        customer: result
      });
    });
  });
});

/* POST card info */ 
router.post('/:id/enterCardInfo', function(req, res, next) {
  var cardInfo = new CardInfo({
    cardFirstName: req.body.cardFirstName,
    cardLastName: req.body.cardLastName,
    cardNumber: req.body.cardNumber,
    cardSecurity: req.body.cardSecurity,
    cardExpiration: req.body.cardExpiration
  })

  var id = new ObjectID(req.params.id);
  MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');
    var query = {_id: id};
    var update = { $set: {'purchaseInfo.cardInfo': cardInfo}};

    console.log(cardInfo);

    dbo.collection('customers').updateOne(query, update);
    res.redirect('/customer/' + id);
  });
})

module.exports = router;