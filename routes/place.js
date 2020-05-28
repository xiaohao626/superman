var express = require("express");
var router = express.Router();
const placeController = require("../controllers/place.server.controller");

// 查询某景点详情 TODO: 改造成查询套餐详情
router.get("/getAllPlace", placeController.queryAllPlace);

router.get("/queryPlaceDetailById", placeController.queryPlaceDetailById);
//新增景点
router.post("/createPlace", placeController.createPlace);
//修改景点
router.get("/updataPlaceById", placeController.updataPlaceById);
//删除景点
router.get("/delPlace", placeController.deletePlace);


module.exports = router;
