var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = Schema({
   name: String,
   description: String,
   price: Number,
   category: { type: Schema.ObjectId, ref: "Category" }
});

var Item = mongoose.model('Item', ItemSchema);
module.exports = Item;