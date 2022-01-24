const axios = require("axios");
const cheerio = require("cheerio");

// Reg Expression to Check Absolute URL
var isAbsoluteURLRegex = /^(?:\w+:)\/\//;

/**
 * Get Pagination from page and size
 * @param {number} page - page number
 * @param {number} size - size
 * @return {object}
 */
exports.getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? --page * limit : 0;

  return { limit, offset };
};

/**
 * Get Pagination Data
 * @param {array} data - scrape data from database
 * @param {number} page - page number
 * @param {number} limit - limit or size
 * @return {object}
 */
exports.getPagingData = (data, page, limit) => {
  const { count: totalCount, rows: scrapeData } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalCount / limit);

  return { totalCount, scrapeData, totalPages, currentPage };
};

/**
 * Media Scraping for Requested Urls
 * @param {array} urls - requested urls for media scraping
 * @return {Promise<array<response>>}
 */
exports.mediaScrapingForURLs = async (urls) => {
  const responses = [];
  for (let i = 0; i < urls.length; i++) {
    responses.push(...(await urlToScrapedData(urls[i])));
  }

  return responses;
};

/**
 * Get Scrap Data for a Particular URL
 * @param {string} urlParam - url for media scraping
 * @return {Promise<array<scrapedData>>}
 */
const urlToScrapedData = (urlParam) => {
  return axios
    .get(urlParam)
    .then((response) => {
      const html = response.data;

      const scrapedData = processHtmlToData(html, urlParam);
      return scrapedData;
    })
    .catch((error) => error);
};

/**
 * Process Scrap data for a Particular html Against One URL
 * @param {object} html - html for a particular url
 * @param {string} URL - url for media scraping
 * @return {<array<scrapedData>>}
 */
const processHtmlToData = (html, URL) => {
  let scrapedData = [];

  const $ = cheerio.load(html);

  $("img").each((index, img) => {
    const src = $(img).attr("src");

    if (src) {
      const imageMetaData = getImageMetaData(src, URL);
      scrapedData.push(imageMetaData);
    }
  });

  $("video").each((index, vid) => {
    const src = $(vid).attr("src");

    if (src) {
      const videoMetaData = getVideoMetaData(src, URL);
      scrapedData.push(videoMetaData);
    }
  });

  return scrapedData;
};

/**
 * Get Image Meta Data for a Particular Img
 * @param {string} imgSrc - src for img
 * @param {string} urlParam - url for media scraping
 * @return {object}
 */

const getImageMetaData = (imgSrc, urlParam) => {
  let url = "";

  isAbsoluteURLRegex.test(imgSrc)
    ? (url = imgSrc)
    : (url = getBaseUrl(urlParam) + imgSrc);

  const name = url.split("/").pop();
  const type = "image";

  return { name, type, url };
};

/**
 * Get Video Meta Data for a Particular Video
 * @param {string} vidSrc - src for video
 * @param {string} urlParam - url for media scraping
 * @return {object}
 */
const getVideoMetaData = (vidSrc, urlParam) => {
  let url = "";

  isAbsoluteURLRegex.test(vidSrc)
    ? (url = vidSrc)
    : (url = getBaseUrl(urlParam) + vidSrc);

  const name = url.split("/").pop();
  const type = "video";

  return { name, type, url };
};

/**
 * Get Base URL from a URL
 * @param {string} urlParam - url
 * @return {string}
 */
const getBaseUrl = (urlParam) => {
  const url = new URL(urlParam);
  return `${url.protocol}//${url.host}`;
};
