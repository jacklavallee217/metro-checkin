var mongoose = require('mongoose');
var Item = require('./Item.model').schema;
var CardInfo = require('./CardInfo.model').schema;

const purchaseSchema = mongoose.Schema({
    date: {
        type: Date,
        default:Date.now()
    },
    item: Item,
    payedByCash: Boolean,
    cardInformation: CardInfo
})

module.exports = mongoose.model('Purchase', purchaseSchema);