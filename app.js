// dependencies
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var flash = require("connect-flash");
var config = require("./config.json");
var routes = require("./routes/index");
var users = require("./routes/users");
var fs = require("fs");

var app = express();

app.use(express.static(path.join(__dirname, "/public")));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  require("express-session")({
    secret: "cookie_secret",
    name: "cookie_name",
    proxy: true,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());

app.use("/", routes);

// passport config
var Account = require("./models/account");

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose

var mongoDB = config.url;

mongoose.connect(
  mongoDB,
  {
    useMongoClient: true
  }
);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace

if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

module.exports = app;
