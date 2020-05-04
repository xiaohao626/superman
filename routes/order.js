var express = require("express");
var router = express.Router();
const orderController = require("../controllers/order.server.controller");

// 生成订单
router.get("/createOrder", orderController.createOrder);
// 根据用户id查询订单表
router.get("/queryOrderByUid", orderController.queryOrderListByUid);

module.exports = router;
