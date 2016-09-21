var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
   username: String,
   name: String,
   address: String,
   phone: String,
   password: String,
   rol: Number
});
var User = mongoose.model('User', UserSchema);

module.exports = User;