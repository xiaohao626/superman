var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.server.controller");

/* GET users listing. */
router.get("/getLoginInfo", userController.getUserlist);
router.get("/login", userController.userLogin);
router.get("/getUserList", userController.getUserList);


module.exports = router;
