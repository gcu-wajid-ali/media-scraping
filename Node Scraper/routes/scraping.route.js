var express = require("express");
const { body, param } = require("express-validator");
var router = express.Router();

var scraping = require("../controllers/scraping.controller");
var validate = require("../util/validateSchema");

/* GET user listing. */
router.get("/", scraping.findAll);

/* Create a user */
router.post(
  "/create",
  validate([body("urls").isArray().notEmpty()]), //parameter validation
  scraping.create
);

module.exports = router;
