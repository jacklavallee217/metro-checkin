var mongoose = require('mongoose');
const Purchase = require('./Purchase.model').schema;
const Item = require('./Item.model').schema;

const customerSchema = mongoose.Schema({
    lastAdmitted: Date,
    customerInfo : {
        firstName: String,
        lastName: String,
        age: Number,
        note: String,
        email: String,
        emergencyName: String,
        emergencyNumber: Number,
        image: String,
        privilege: String,
        membership: String
    },
    purchaseHistory : {
        purchases: [Purchase]
    },
    itemCart : [Item]
})

module.exports = mongoose.model('Customer', customerSchema);