var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
   name: String,
   description: String
});
var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;