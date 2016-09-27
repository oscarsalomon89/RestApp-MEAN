var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = Schema({
   name: String,
   description: String,
   items: [{ type: Schema.ObjectId, ref: 'Item' }]
});

var Category = mongoose.model('Category', CategorySchema);
module.exports = Category;