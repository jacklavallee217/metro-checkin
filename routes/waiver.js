var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const Customer = require('../models/Customer.model');

router.post('/waiver', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  var newWaiver = new Customer({
      customerInfo : {
        firstName: req.body.wFirstName,
        lastName: req.body.wLastName,
        age: req.body.wAge,
        note: null,
        email: req.body.wEmail,
        emergencyName: req.body.wEmergencyName,
        emergencyNumber: req.body.wEmergencyNumber,
        image: null,
        privilege: 'None',
        membership: 'None'
      },
      purchaseInfo : {
        purchaseHistory: []
      },
      itemCart : []
  })

  MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
      if (err) throw err;
      var dbo = db.db('test');
      dbo.collection('waiverQueue').insertOne(newWaiver, 
          function(err, doc) {
              if (err) throw err;
              res.render('waiver', {
                newWaiver: newWaiver,
                display: 'block'
              });
              db.close();
          }
      )
  })
})

router.use(function (req,res,next){
  res.status(404).send('Unable to find the requested resource!');
});

module.exports = router;