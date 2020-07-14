var mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    itemName: String,
    itemPrice: Number,
    itemType: String,
    quantity: Number
})

module.exports = mongoose.model('Item', itemSchema);