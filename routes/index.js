var express = require("express");
var passport = require("passport");
var Account = require("../models/account");
var ActivityController = require("../controllers/activityController");
var AccountController = require("../controllers/accountController");
var SearchController = require("../controllers/searchController");
var router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.user) return next();
  else
    return res.status(401).json({
      error: "User not authenticated"
    });
}

// unauthed routes
router.get("/", (req, res) => {
  res.render("index", {});
});
router.get("/login", AccountController.account_login_get);
router.post("/login", AccountController.account_login_post);
router.get("/logout", AccountController.account_logout_get);

router.get("/register", (req, res) => {
  res.render("register", { title: " Register" });
});

router.post("/register", AccountController.account_register_post);

// authed routes

router.post("/activity/user/:id/", ActivityController.activity_create_post);
router.get("/activity/user/:id/", ActivityController.activity_create_get);

router.get("/search/user/:id/", SearchController.search_get2);

router.get("/user/:id/", AccountController.account_index_get);
router.get("/activity/user/delete/:id/", ActivityController.activity_delete_post);

router.get("/test/user/:id/", (req, res) => {
  res.render("test", { user: req.user });
});

router.post("/test/user/:id/", (req, res) => {
  res.render("test", { user: req.user });
});

module.exports = router;
