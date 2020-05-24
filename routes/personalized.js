var express = require("express");
var router = express.Router();
const personalizedController = require("../controllers/personalized.server.controller");

// 通过用户Id查询个性化推荐
router.get(
  "/queryPersonalizedByUid",
  personalizedController.queryPersonalizedByUid
);

module.exports = router;
