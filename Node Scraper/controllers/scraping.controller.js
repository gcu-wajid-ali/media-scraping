const jwt = require("jsonwebtoken");

const apiStatusCode = require("../global_variables/statusCode");
const globalMessages = require("../global_variables/messages");
const scrapingService = require("../services/scraping.service");

const db = require("../config/db.config");
const mediaScraperModel = db.scrapper;
const Op = db.Sequelize.Op;

/**
 * Get All Database Media Scrapping Data
 */
exports.findAll = (req, res) => {
  const { page, size, name } = req.query;
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  const { limit, offset } = scrapingService.getPagination(page, size);

  mediaScraperModel
    .findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const scrapedData = scrapingService.getPagingData(data, page, limit);
      res.status(apiStatusCode.Ok).send(scrapedData);
    })
    .catch((error) =>
      res.status(apiStatusCode.Conflict).json({
        error: error,
        message: globalMessages.Conflict,
      })
    );
};

/**
 * Create Media Scrapping Data in Database Based on Requested URLs
 */
exports.create = async (req, res) => {
  const urls = req.body.urls;

  const mediaScrapingData = await scrapingService.mediaScrapingForURLs(urls);

  mediaScraperModel
    .bulkCreate(mediaScrapingData)
    .then((data) => {
      res.status(apiStatusCode.Created).json({
        message: `Media Scraping ${globalMessages.Created}`,
        scrapedData: data,
      });
    })
    .catch((error) =>
      res.status(apiStatusCode.Conflict).json({
        error: error,
        message: globalMessages.Conflict,
      })
    );
};
