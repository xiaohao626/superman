var express = require("express");
var router = express.Router();
const orderController = require("../controllers/order.server.controller");

// 生成订单
router.get("/createOrder", orderController.createOrder);

// 根据用户Id查询订单表
router.get("/queryOrderByUid", orderController.queryOrderListByUid);

// 根据用户Id & 订单编号查询订单详情
router.get(
  "/queryOrderDetailByUidAndNumber",
  orderController.queryOrderDetailByUidAndNumber
);

// 根据订单编号完成订单
router.get("/completeOrderByNumber", orderController.completeOrderByNumber);

// 根据订单编号删除订单
router.get("/deleteOrderByNumber", orderController.deleteOrderByNumber);

// 获取订单列表
router.get("/queryOrderList", orderController.queryOrderList);

// 删除订单
router.get("/deleteOrder", orderController.deleteOrder);

module.exports = router;
