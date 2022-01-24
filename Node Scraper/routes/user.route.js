var express = require("express");
const { body, param } = require("express-validator");
var router = express.Router();

var user = require("../controllers/user.controller");
var validate = require("../util/validateSchema");

/* GET user listing. */
router.get("/", user.findAll);

/* Create a user */
router.post(
  "/create",
  validate([
    body("username").isString().notEmpty(), //parameter validation
    body("email").isEmail().notEmpty(),
    body("password").isString().notEmpty(),
  ]),
  user.create
);

/* Retrieve a single user by Id */
router.get(
  "/:userId",
  validate([param("userId").isNumeric().notEmpty()]), //parameter validation
  user.findById
);

/* Update a user with Id */
router.put(
  "/:userId",
  validate([
    param("userId").isNumeric().notEmpty(), //parameter validation
    body("username").isString().notEmpty(),
    body("email").isEmail().notEmpty(),
    body("password").isString().notEmpty(),
  ]),
  user.update
);

/* Delete a user with Id */
router.delete(
  "/:userId",
  validate([param("userId").isNumeric().notEmpty()]), //parameter validation
  user.delete
);

/* Log in user */
router.post(
  "/login",
  validate([
    body("email").isEmail().notEmpty(), //parameter validation
    body("password").isString().notEmpty(),
  ]),
  user.logIn
);

module.exports = router;
