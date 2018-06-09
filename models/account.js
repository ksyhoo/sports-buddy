var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var AccountSchema = new Schema({
  username: String,
  password: String,
  password_repeat: String,
  email: String
});

AccountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Account", AccountSchema);
