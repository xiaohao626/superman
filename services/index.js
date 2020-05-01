const classify = require("./classify");
const combos = require("./combos");
const place = require("./place");
const user = require("./user");
const comment = require("./comment");

module.exports = {
  ...classify,
  ...combos,
  ...place,
  ...user,
  ...comment,
};
