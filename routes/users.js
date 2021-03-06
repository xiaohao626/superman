var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.server.controller");

/* GET users listing. */
router.get("/getLoginInfo", userController.getUserlist);
router.get("/login", userController.userLogin);
router.get("/getUserList", userController.getUserList);
router.get("/deleteUser", userController.deleteUser);
router.get("/createUser", userController.createUser);

// 通过用户Id查询用户信息
router.get("/queryUserInfoByUid", userController.queryUserInfoByUid);

// 通过用户Id修改用户信息（用户个人主动修改）
router.get("/editUserInfoByUid", userController.editUserInfoByUid);

// 增加或删除用户偏好景点特色类型
router.get("/editUserScenic", userController.editUserScenicByUid);

module.exports = router;
