var mongoose = require('mongoose');
var Item = require('./Item.model').schema;
var CardInfo = require('./CardInfo.model').schema;

const purchaseSchema = mongoose.Schema({
    totalPrice: Number,
    customerID: String,
    date: {
        type: Date,
        default: Date.now()
    },
    items: [Item],
    purchaseType: String,
    cardInformation: {
        type: CardInfo,
        default: null
    }
})

module.exports = mongoose.model('Purchase', purchaseSchema);