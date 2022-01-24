var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");

var app = express();
app.use(cors());

// middleware for logging
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

/**
 * Sync Database
 */
const db = require("./config/db.config");
db.sequelize
  .sync()
  .then(() => {
    console.log("Database looks fine");
  })
  .catch((error) => console.log("db error", error));

/**
 * Passport Middleware for Basic Auth
 */

const passport = require("passport");
require("./middleware/passport");

/**
 * Sample index route for testing purposes
 * Added Auth middleware with passport
 */

var indexRouter = require("./routes/index");
app.use(
  "/sample",
  passport.authenticate("jwt", { session: false }), // Auth middleware with passport
  indexRouter
);

/**
 * User route
 */
var usersRouter = require("./routes/user.route");
app.use("/users", usersRouter);

/**
 * Media Scraping route
 */
 var scrapingRouter = require("./routes/scraping.route");
 app.use("/media-scraping", scrapingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// middleware for error handling
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ err });
});

module.exports = app;
