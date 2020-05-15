var express = require("express");
var router = express.Router();
const orderController = require("../controllers/order.server.controller");

// 生成订单
router.get("/createOrder", orderController.createOrder);

// 根据用户id查询订单表
router.get("/queryOrderByUid", orderController.queryOrderListByUid);

// 根据订单编号完成订单
router.get("/completeOrderByNumber", orderController.completeOrderByNumber);

// 根据订单编号删除订单
router.get("/deleteOrderByNumber", orderController.deleteOrderByNumber);

module.exports = router;
