var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/test';

var hasSearched = false; 
var emptySearched = true;

var passItems = [];
var membershipItems = [];
var foodItems = [];
var gearItems = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');
    dbo.collection('customers').find({}).toArray(function(err, result) {
      if (err) throw err;

      if (hasSearched) {
        if (emptySearched) {
          res.render('index', {
            customers: result,
            errorMessage: 'No customers found.',
            display: 'block'
          });
        }
        else {
          res.render('index', {
            customers: result,
            errorMessage: 'Please enter search criteria.',
            display: 'block'
          });
        }
      }
      else {
        res.render('index', {
          customers: result
        });
      }
      db.close();
      hasSearched = false;
      emptySearched = true;
    });
  });
});

/* POST search page. */
router.post('/search', function(req, res, next) {
  var firstName = req.body.firstSearch;
  var lastName = req.body.lastSearch;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err; 
    var dbo = db.db('test');
    if (firstName || lastName) {
      firstName = new RegExp('^' + firstName, 'i');
      lastName = new RegExp('^' + lastName, 'i');
      dbo.collection('customers').find({ $and: [ {'customerInfo.firstName': firstName}, {'customerInfo.lastName': lastName} ] }).toArray(function(err, result) {
        if (err) throw err;
        if (result.length < 1) {
          hasSearched = true;
          emptySearched = true;
          res.redirect('/');
        }
        else {
          hasSearched = false;
          emptySearched = true;
          res.render('search', {
            customers: result
          });
        }
      });
    }
    else {
      hasSearched = true;
      emptySearched = false;
      res.redirect('/');
    }
  });
});

/* GET waiver queue page. */
router.get('/waiverQueue', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');
    dbo.collection('waiverQueue').find({}).toArray( function(err, result) {
      if (err) throw err;
      res.render('waiverQueue', {
        waivers: result
      });
    });
  });
});

/* GET anonymous purchase page. */
router.get('/anonymous/purchase', function(req, res, next) {
  var id = new ObjectID('5ef0fd6db151f75119a3fc34');
  MongoClient.connect(url, function(err, db) {
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
      console.log(result);
      res.render('purchase', {
        customer: result,
        passItems: passItems
      });
    });
  });
});

/* GET customer page. */
router.get('/customer/:id', function(req, res, next) {
  var id = new ObjectID(req.params.id);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');
    dbo.collection('customers').findOne({_id: id}, function(err, result) {
      if (err) throw err;
      res.render('customer', {
        customer: result
      });
    });
  });
});

/* GET waiver page. */
router.get('/waiver', function(req, res, next) {
    res.render('waiver');
});

/* GET waiver page. */
router.get('/waiverForm', function(req, res, next) {
  res.render('waiverForm');
});

module.exports = router;
