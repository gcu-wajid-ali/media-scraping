"use strict";
module.exports = (sequelize, DataTypes) => {
  const Scraper = sequelize.define(
    "media_scraper",
    {
      name: DataTypes.STRING,  
      type: DataTypes.STRING,
      url: DataTypes.STRING
    },
    { timestamps: false }
  );
  Scraper.associate = function (models) {
    // associations can be defined here
  };
  return Scraper;
};
