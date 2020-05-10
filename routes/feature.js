var express = require("express");
var router = express.Router();
const featureController = require("../controllers/feature.server.controller");

// 通过套餐Id查询评论
router.get("/queryFeature", featureController.queryFeatureList);

module.exports = router;
