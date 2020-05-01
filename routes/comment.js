var express = require("express");
var router = express.Router();
const commentController = require("../controllers/comment.server.controller");

// 通过套餐Id查询评论
router.get("/queryCommentByCombo", commentController.queryCommentByCombosId);

module.exports = router;
