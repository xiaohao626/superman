var express = require("express");
var router = express.Router();
const featureController = require("../controllers/feature.server.controller");

// 通过套餐Id查询评论
router.get("/queryFeature", featureController.queryFeatureList);
//新增景点星级
router.get("/createFeature", featureController.createFeature);
//修改景点星级
router.get("/updataByfeatureId", featureController.updataByfeatureId);
//删除景点星级
router.get("/deleteFeature", featureController.deleteFeature);

module.exports = router;
