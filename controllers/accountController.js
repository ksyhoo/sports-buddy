var Account = require("../models/account");
var passport = require("passport");
var { body, validationResult } = require("express-validator/check");
var { sanitizeBody } = require("express-validator/filter");

exports.account_index_get = function(req, res) {
  res.render("index", { user: req.user, title: "Home" });
};

exports.account_login_get = function(req, res) {
  res.render("login", { title: "Log In", error: req.flash("error") });
};

exports.account_login_post = (req, res, next) => {
  passport.authenticate("local", { failureRedirect: "/login", failureFlash: true })(
    req,
    res,
    () => {
      req.session.save(err => {
        if (err) {
          return next(err);
        }
        var id = req.user.id;
        res.redirect("/user/" + id);
      });
    }
  );
};

exports.account_logout_get = (req, res, next) => {
  req.logout();
  req.session.save(err => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.account_register_post = [
  body("username", "username must  be at least 3 chars.")
    .isLength({ min: 3 })
    .trim(),
  body("password", "password must be at least 6 chars.")
    .isLength({ min: 6 })
    .trim(),
  body("password_repeat", "password repeat must not be empty and match your password.")
    .isLength({ min: 6 })
    .trim(),
  body("email", "email must not be empty. ")
    .isLength({ min: 1 })
    .isEmail()
    .trim(),

  sanitizeBody("*")
    .trim()
    .escape(),

  (req, res, next) => {
    var errors = validationResult(req);
    if (errors.isEmpty()) {
      Account.register(
        new Account({ username: req.body.username, email: req.body.email }),
        req.body.password,
        (err, account) => {
          if (err) {
            return res.render("register", { error: err.message }, { title: "Register" });
          }

          passport.authenticate("local")(req, res, () => {
            req.session.save(err => {
              if (err) {
                return next(err);
              }
              var id = req.user.id;
              res.redirect("/user/" + id);
            });
          });
        }
      );
    } else {
      res.render("register", {
        title: "register",
        errors: errors.array()
      });
    }
  }
];
