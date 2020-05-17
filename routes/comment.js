var express = require("express");
var router = express.Router();
const commentController = require("../controllers/comment.server.controller");

// 通过套餐Id查询评论
router.get(
  "/queryCommentListByCombosId",
  commentController.queryCommentListByCombosId
);

// 生成评价
router.get("/createComment", commentController.createComment);

router.get("/queryCommentList", commentController.queryCommentList); //获取评论列表

router.get("/deleteComment", commentController.deleteComment); //删除评论

module.exports = router;
