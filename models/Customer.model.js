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
        membershipInfo : {
            isMember: Boolean,
            membershipType: String,
            membershipStart: Date,
            membershipEnd: Date,
            daysLeft: Number
        }
    },
    address : {
        billingAddress: String,
        zipCode: Number
    },
    purchaseInfo : {
        purchaseHistory: [Purchase]
    },
    itemCart : [Item]
})

module.exports = mongoose.model('Customer', customerSchema);