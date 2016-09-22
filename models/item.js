var mongoose = require('mongoose');

var ItemSchema = mongoose.Schema({
   name: String,
   description: String,
   category: String,
   price: Number
});
var Item = mongoose.model('Item', ItemSchema);

module.exports = Item;