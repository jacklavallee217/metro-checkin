var mongoose = require('mongoose');

const cardinfoSchema = mongoose.Schema({
    cardFirstName: String,
    cardLastName: String,
    cardNumber: Number,
    cardSecurity: Number,
    cardExpirationMonth: Number,
    cardExpirationYear: Number
})

module.exports = mongoose.model('CardInfo', cardinfoSchema);