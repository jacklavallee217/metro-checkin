var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const Item = require('../models/Item.model');
const Purchase = require('../models/Purchase.model');

router.post('/:id/addToCart', function(req, res, next) {
  var newItem = new Item({
    itemName: req.body.itemName,
    itemPrice: req.body.itemPrice,
    itemType: req.body.itemType,
    quantity: 1,
    totalPrice: req.body.itemPrice
  })

  var id = new ObjectID(req.params.id);
  MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');
    var query = {_id: id};
    var update = { $push: {'itemCart': newItem}};

    dbo.collection('customers').updateOne(query, update);
    res.redirect('/customer/purchase/' + id);
  })
})

router.post('/:id/deleteItem', function(req, res, next) {
  var id = new ObjectID(req.params.id);
  var itemID = new ObjectID(req.body.itemID);
  MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');

    dbo.collection('customers').updateOne({_id: id}, { $pull: {'itemCart': {_id: itemID}}});
    res.redirect('/customer/purchase/' + id);
  });
});

router.post('/:id/updateQuantity', function(req, res, next) {
  var newItem = new Item({
    itemName: req.body.itemName,
    itemPrice: req.body.itemPrice,
    itemType: req.body.itemType,
    quantity: req.body.quantity,
    totalPrice: req.body.itemPrice
  })

  var newPrice = (newItem.itemPrice * newItem.quantity);
  console.group('itemPrice: ' + newItem.itemPrice);
  console.group('quantity: ' + newItem.quantity);
  newItem.totalPrice = newPrice;

  var id = new ObjectID(req.params.id);

  MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');

    var query = { $and : [ {'_id': id}, {'itemCart.itemName': newItem.itemName}]};
    var update = { $set: {'itemCart.$.itemPrice': newItem.itemPrice, 'itemCart.$.quantity': newItem.quantity, 'itemCart.$.totalPrice': newItem.totalPrice}};

    //console.log(newItem);

    dbo.collection('customers').updateOne(query, update, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.redirect('/customer/purchase/' + id);
    });
  })
});

router.post('/:id/confirmPurchase', function(req, res, next) {
  var id = new ObjectID(req.params.id);

  var newPurchase = new Purchase({
    totalPrice : 0,
    customerID : id,
    purchaseType : req.body.purchaseType
  })

  MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');
  
    var customers = dbo.collection('customers');
    var purchaseHistory = dbo.collection('purchaseHistory');

    var query = {_id: id};

    customers.findOne(query, function(err, result) {
      if (err) throw err;

      for (var i = 0; i < result.itemCart.length; i++) {
          newPurchase.totalPrice += result.itemCart[i].itemPrice
          newPurchase.items[i] = result.itemCart[i];
      }

      console.log(newPurchase.totalPrice);

      var update = { $push: {'purchaseInfo.purchaseHistory': newPurchase}};

      customers.updateOne(query, update);
      purchaseHistory.insertOne(newPurchase);
      customers.updateOne(query, { $pull: {'itemCart': {}}});
      res.redirect('/customer/purchase/' + id);
    })
  });
});


router.post('/purchase/:id', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/anonymous/purchase', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;