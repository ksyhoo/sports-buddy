var account = require("../models/account.js");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AcitvitySchema = new Schema({
  city: String,
  street: String,
  zipcode: String,
  streetnumber: String,
  dayoftheweek: [{ type: Array, enum: ["0", "1", "2", "3", "4", "5", "6"] }],
  specificday: Date,
  activity: String,
  usercomment: String,

  account: [{ type: mongoose.Schema.Types.ObjectId, ref: "account", required: true }]
});

module.exports = mongoose.model("Activity", AcitvitySchema);
