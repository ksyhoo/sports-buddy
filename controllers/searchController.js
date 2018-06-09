var Activity = require("../models/activity");
var Account = require("../models/account");
var mongoose = require("mongoose");
var passport = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");

exports.search_get2 = function(req, res, next) {
  var cit = req.body.city;
  var cit2 = req.query;

  Activity.find({ city: cit2.city }).exec(function(err, search_activity) {
    if (err) {
      return next(err);
    }
    res.render("search", {
      title: "Search results",
      user: req.user,
      error: req.flash("error"),
      search_post: search_activity
    });
  });
};

exports.search_get3 = function(req, res, next) {
  res.render("search", {
    title: "Search results",
    user: req.user,
    error: req.flash("error")
  });
};
