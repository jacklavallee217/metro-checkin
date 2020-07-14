var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const Item = require('../models/Item.model');

router.post('/:id', function(req, res, next) {

  var customer;
  var passItems = [];
  var newItem = new Item({
    itemName: req.body.itemName,
    itemPrice: req.body.itemPrice,
    itemType: req.body.itemType,
    quantity: 1
  })

  var id = new ObjectID(req.params.id);
  MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');
    var query = {_id: id};
    var update = { $push: {'itemCart': [newItem]}};
    dbo.collection('customers').updateOne(query, update);
    dbo.collection('customers').find({query})
    dbo.collection('customers').findOne(query, function(err, result) {
      if (err) throw err;
      customer = result;
      console.log(customer);
    })

    dbo.collection('passItems').find({}).sort({order_num: 1}).toArray(function(err, result) {
      if (err) { throw err }
      else {
        for (i = 0; i < result.length; i++) {
          passItems[i] = result[i];
        }
      }
    });

    res.render('purchase', {
      customer: customer,
      passItems: passItems,
      itemCart: newItem
    });
  })
})

router.post('/purchase/:id', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/anonymous/purchase', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;