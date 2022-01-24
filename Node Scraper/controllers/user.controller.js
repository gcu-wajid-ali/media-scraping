const jwt = require("jsonwebtoken");

const configurationSecrets = require("../config/constants");
const apiStatusCode = require("../global_variables/statusCode");
const globalMessages = require("../global_variables/messages");
const userService = require("../services/user.service");

/**
 * Get All Database Users
 */
exports.findAll = (req, res) => {
  userService
    .findAll()
    .then((users) => {
      res.status(apiStatusCode.Ok).send(users);
    })
    .catch((error) =>
      res.status(apiStatusCode.Conflict).json({
        error: error,
        message: globalMessages.Conflict,
      })
    );
};

/**
 * Create User in Database
 */
exports.create = (req, res) => {
  userService
    .create(req)
    .then((newUser) => {
      res.status(apiStatusCode.Created).json({
        message: `User ${globalMessages.Created}`,
        user: newUser,
      });
    })
    .catch((error) =>
      res.status(apiStatusCode.Conflict).json({
        error: error,
        message: globalMessages.Conflict,
      })
    );
};

/**
 * Get a User by Id
 */
exports.findById = (req, res) => {
  var id = req.params.userId;
  userService
    .findById(id)
    .then((user) => {
      res.status(apiStatusCode.Ok).send(user);
    })
    .catch((err) =>
      res.status(apiStatusCode.Conflict).json({
        error: err,
        message: globalMessages.Conflict,
      })
    );
};

/**
 * Update a User by Id
 */
exports.update = (req, res) => {
  userService
    .update(req)
    .then((result) => {
      res.status(apiStatusCode.Ok).send(result);
    })
    .catch((error) =>
      res.status(apiStatusCode.Conflict).json({
        error: error,
        message: globalMessages.Conflict,
      })
    );
};

/**
 * Delete a User by Id
 */
exports.delete = (req, res) => {
  const id = req.params.userId;
  userService
    .delete(id)
    .then((result) => {
      res.status(apiStatusCode.Ok).send(result);
    })
    .catch((error) => {
      res.status(apiStatusCode.Conflict).json({
        error: error,
        message: globalMessages.Conflict,
      });
    });
};

/**
 * Log In User
 */
exports.logIn = (req, res) => {
  const userInfo = ({ email, password } = req.body);

  userService
    .logIn(email, password)
    .then((result) => {
      const token = jwt.sign(userInfo, configurationSecrets.jwtSecretKey);
      return res.status(apiStatusCode.Ok).json({ token: token });
    })
    .catch((error) => {
      res.status(apiStatusCode.Conflict).json({
        error: error,
        message: globalMessages.Conflict,
      });
    });
};
