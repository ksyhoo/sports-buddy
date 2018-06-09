var Activity = require("../models/activity");
var Account = require("../models/account");
var mongoose = require("mongoose");
var passport = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");
var { body, validationResult } = require("express-validator/check");
var { sanitizeBody } = require("express-validator/filter");

//user activities create on POST.

exports.activity_create_post = [
  body("city", "city must not be empty.")
    .isLength({ min: 1 })
    .trim(),
  body("street", "street must not be empty.")
    .isLength({ min: 1 })
    .trim(),
  body("streetnumber", "streetnumber must not be empty.")
    .isLength({ min: 1 })
    .trim(),
  body("zipcode", "zipcode must not be empty and in XX-XXX format.")
    .matches("[0-9]{2}-[0-9]{3}")
    .trim(),

  body("activity", "activity must be chosen.")
    .isLength({ min: 1 })
    .trim(),
  body("usercomment", "usercomment must not be empty.")
    .isLength({ min: 1 })
    .trim(),

  sanitizeBody("*")
    .trim()
    .escape(),

  function(req, res, next) {
    var errors = validationResult(req);
    var id = req.user.id;
    var Act = new Activity({
      city: req.body.city,
      street: req.body.street,
      zipcode: req.body.zipcode,
      dayoftheweek: req.body.dayoftheweek,
      streetnumber: req.body.streetnumber,
      specificday: req.body.specificday,
      activity: req.body.activity,
      usercomment: req.body.usercomment,
      account: id
    });

    if (!errors.isEmpty()) {
      const newLocal = { account: req.params.id };
      Activity.find(newLocal)
        .sort([["city", "ascending"]])
        .exec(function(err, list_activity) {
          if (err) {
            return next(err);
          }
          res.render("activity", {
            title: "Activities",
            user: req.user,
            errors: errors.array(),
            activity_create_get: list_activity
          });
        });
    } else {
      Act.save()
        .then(item => {
          res.redirect("/activity/user/" + req.user.id);
        })
        .catch(err => {
          res.status(400).send("unable to save to database");
        });
    }
  }
];

//activities of authed user render on GET

exports.activity_create_get = function(req, res, next) {
  const newLocal = { account: req.params.id };
  Activity.find(newLocal)
    .sort([["city", "ascending"]])
    .exec(function(err, list_activity) {
      if (err) {
        return next(err);
      }
      res.render("activity", {
        title: "Activities",
        user: req.user,
        error: req.flash("error"),
        activity_create_get: list_activity
      });
    });
};

//delete user acitvity on button click GET

exports.activity_delete_post = function(req, res, next) {
  const newLocal = req.params.id;
  Activity.remove({ _id: newLocal })
    .then(item => {
      var id = req.user.id;
      res.redirect("/activity/user/" + req.user.id);
    })
    .catch(err => {
      res.status(400).send("unable to delete from database");
    });
};
