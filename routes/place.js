var express = require("express");
var router = express.Router();
const placeController = require("../controllers/place.server.controller");

// 查找home页景区列表
// router.get("/getHomeList", placeController.getHomeList);
// 按条件筛选景点
// router.get("/conditionalSearchPlace", placeController.conditionalSearchPlace);
// 查询某景点详情 TODO: 改造成查询套餐详情
router.get("/getPlaceDetail", placeController.getPlaceDetail);

module.exports = router;
