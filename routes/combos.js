var express = require("express");
var router = express.Router();
const combosController = require("../controllers/combos.server.controller");

// 查找home页套餐列表
router.get("/getHomeCombosList", combosController.getCombosList);
router.get("/fuzzyQueryCombosList", combosController.fuzzyQueryCombosList);
router.get("/queryCombosDetail", combosController.getCombosDetail);
router.get("/queryCombosList", combosController.queryCombosList);//获取套餐列表
router.get("/deleteCombos", combosController.deleteCombos);//删除套餐

module.exports = router;
