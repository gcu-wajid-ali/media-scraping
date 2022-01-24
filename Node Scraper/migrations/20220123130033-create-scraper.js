'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('media_scraper', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      }, 
      url: {
        type: Sequelize.STRING
      },   
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('media_scraper');
  }
};