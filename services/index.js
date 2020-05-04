const classify = require("./classify");
const combos = require("./combos");
const place = require("./place");
const user = require("./user");
const comment = require("./comment");
const scenicType = require("./scenicType");
const order = require("./order");

module.exports = {
  ...classify,
  ...combos,
  ...place,
  ...user,
  ...comment,
  ...scenicType,
  ...order,
};
