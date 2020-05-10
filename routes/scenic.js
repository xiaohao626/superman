var express = require("express");
var router = express.Router();
const scenicController = require("../controllers/scenic.server.controller");

// 通过套餐Id查询评论
router.get("/queryScenic", scenicController.queryScenicList);

module.exports = router;
