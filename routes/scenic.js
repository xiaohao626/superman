var express = require("express");
var router = express.Router();
const scenicController = require("../controllers/scenic.server.controller");
/*------------景点类型------------ */
// 通过套餐Id查询评论
router.get("/queryScenic", scenicController.queryScenicList);
//查询景点类型
router.get("/queryTypeList", scenicController.queryTypeList);
//新增景点类型
router.get("/createScenicType",scenicController.createScenicType);
//修改景点类型
router.get("/updataByScenicId",scenicController.updataByScenicId);
//删除景点类型
router.get("/deleteScenicTpye",scenicController.deleteScenicTpye);
/*------------景点分类------------ */
//查询景点分类
router.get("/queryClassifyList", scenicController.queryClassifyList);
//新增景点分类
router.get("/createClassify",scenicController.createClassify);
//修改景点分类
router.get("/updataByclassifyId",scenicController.updataByclassifyId);
//删除景点分类
router.get("/deleteClassify",scenicController.deleteClassify)

module.exports = router;
