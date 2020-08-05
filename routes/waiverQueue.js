var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const Customer = require('../models/Customer.model');

router.post('/waiverQueue', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/addWaiver:id', function(req, res, next) {
    var id = new ObjectID(req.params.id);
    console.log(id);
    MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
        if (err) throw err;
        var dbo = db.db('test');
        var customers = dbo.collection('customers');
        var waiverQueue = dbo.collection('waiverQueue');

        waiverQueue.findOne({_id: id}, function(err, result) {
            if (err) throw err;
            console.log(result);
            customers.insertOne(result);
            waiverQueue.findOneAndDelete({_id: id});
            res.redirect('/');
        })
    })
})

router.post('/deleteWaiver:id', function(req, res, next) {
    var id = new ObjectID(req.params.id);
    console.log(id);
    MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
        if (err) throw err;
        var dbo = db.db('test');
        var waiverQueue = dbo.collection('waiverQueue');

        waiverQueue.findOne({_id: id}, function(err, result) {
            if (err) throw err;
            console.log(result);
            waiverQueue.findOneAndDelete({_id: id});
            res.redirect('/');
        })
    })
})

module.exports = router;