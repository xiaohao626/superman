var express = require("express");
var router = express.Router();
const imageController = require("../controllers/image.server.controller");

// 上传图片
router.post("/uploadImage", imageController.uploadImage);

module.exports = router;
