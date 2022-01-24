const bcrypt = require("bcrypt");
const db = require("../config/db.config");
const globalMessages = require("../global_variables/messages");

const saltRounds = 10;

const userModel = db.user;

/**
 * Get all users from database
 * @return {Promise<array<User>>}
 */

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    userModel
      .findAll()
      .then((users) => {
        resolve(users);
      })
      .catch((error) => reject(error));
  });
};

/**
 * Create a user in database
 * @param {object} req - request body with parameters
 * @return {Promise<string>}
 */

exports.create = (req) => {
  const { username, email, password } = req.body;

  return new Promise((resolve, reject) => {
    userModel
      .findOne({
        where: { email },
      })
      .then(async (user) => {
        if (user) {
          reject(`User ${globalMessages.Exist}`);
        } else {
          const hash = await convertPasswordToHash(password);

          resolve(
            userModel.create({
              username,
              email,
              password: hash,
            })
          );
        }
      })
      .catch((error) => reject(error));
  });
};

/**
 * Find a user in database by Id
 * @param {number} id - user id
 * @return {Promise<string>}
 */

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    userModel
      .findByPk(id)
      .then((user) => {
        if (user) {
          resolve(user);
        } else {
          reject("User Not Exist");
        }
      })
      .catch((error) => reject(error));
  });
};

/**
 * Update a user in database
 * @param {object} req - request body with parameters
 * @return {Promise<string>}
 */
exports.update = async (req) => {
  const { username, email, password } = req.body;

  const hash = await convertPasswordToHash(password);

  return new Promise((resolve, reject) => {
    userModel
      .update({ username, email, password: hash }, { where: { id: req.params.userId } })
      .then((result) => {
        if (!result[0]) {
          reject("User Not Exist");
        } else {
          resolve(`User ${globalMessages.Updated}`);
        }
      })
      .catch((error) => reject(error));
  });
};

/**
 * Find a user in database by Id
 * @param {number} id - user id
 * @return {Promise<string>}
 */
exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    userModel
      .destroy({
        where: { id: id },
      })
      .then((result) => {
        if (!result) {
          reject("User Not Exist");
        } else {
          resolve(`User ${globalMessages.Deleted}`);
        }
      })
      .catch((error) => reject(error));
  });
};

/**
 * Convert a string containing two comma-separated numbers into a point.
 * @param {string} email - user email
 * @param {string} password - user password
 * @return {Promise<string>}
 */
exports.logIn = (email, password) => {
  return new Promise((resolve, reject) => {
    userModel
      .findOne({
        where: { email },
      })
      .then(async (user) => {
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          resolve("success");
        } else {
          reject(`${globalMessages.Unauthorized} User`);
        }
      })
      .catch((error) => reject(error));
  });
};

/**
 * Convert password to hash string
 * @param {string} myPlaintextPassword - The password string
 * @return {Promise<string>}
 */
const convertPasswordToHash = (myPlaintextPassword) => {
  return bcrypt.hash(myPlaintextPassword, saltRounds);
};
