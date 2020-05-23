var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.server.controller");

/* GET users listing. */
router.get("/getLoginInfo", userController.getUserlist);
router.get("/login", userController.userLogin);
router.get("/getUserList", userController.getUserList);
router.get("/deleteUser", userController.deleteUser);

// 通过用户Id查询用户信息
router.get("/queryUserInfoByUid", userController.queryUserInfoByUid);

// 通过用户Id修改用户信息（用户个人主动修改）
router.get("/editUserInfoByUid", userController.editUserInfoByUid);

module.exports = router;
