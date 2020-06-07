const classify = require("./classify");
const combos = require("./combos");
const place = require("./place");
const user = require("./user");
const comment = require("./comment");
const scenicType = require("./scenicType");
const order = require("./order");
const feature = require("./feature");
const scenic = require("./scenic");
const personalized = require("./personalized");
const browseRecords = require("./browseRecords");
const images = require("./images");

module.exports = {
  ...classify,
  ...combos,
  ...place,
  ...user,
  ...comment,
  ...scenicType,
  ...order,
  ...feature,
  ...scenic,
  ...personalized,
  ...browseRecords,
  ...images,
};
