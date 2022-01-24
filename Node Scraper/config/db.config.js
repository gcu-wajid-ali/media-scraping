const env = require('./config.json');
 
const Sequelize = require('sequelize');

/**
 * Get Database Env Variables and Set it in Sequelize 
 */

const sequelize = new Sequelize(env.development.database, env.development.username, env.development.password, {
  host: env.development.host,
  dialect: env.development.dialect,
  // operatorsAliases: false, 
  
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;

/**
 * Database Models and Sync with Sequelize
 */
db.user = require('../models/user')(sequelize, Sequelize);
db.scrapper = require('../models/media-scrapper')(sequelize, Sequelize);

 
module.exports = db;