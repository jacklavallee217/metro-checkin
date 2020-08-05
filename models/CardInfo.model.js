var mongoose = require('mongoose');

const cardinfoSchema = mongoose.Schema({
    cardFirstName: String,
    cardLastName: String,
    cardNumber: Number,
    cardSecurity: Number,
    cardExpiration: String
})

module.exports = mongoose.model('CardInfo', cardinfoSchema);