const classify = require("./classify");
const combos = require("./combos");
const place = require("./place");
const user = require("./user");

module.exports = {
  ...classify,
  ...combos,
  ...place,
  ...user
};
