const services = require("../services");

module.exports = {
  queryCommentListByCombosId: async (req, res) => {
    try {
      let result = [];
      const { combosId } = req.query || {};
      let queryRes = (await services.queryCommentByCombosId(combosId)) || [];

      if (queryRes && queryRes.length) {
        result = queryRes;
      }

      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  // 查询评论列表
  queryCommentList: async (req, res) => {
    try {
      let result = [];
      result = (await services.queryCommentList()) || [];
      result.forEach((el,index)=>{
        if(el.isDel==1){
          result.splice(index,1)
        }
      });
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  //删除评论
  deleteComment:async (req,res)=>{
    try{
      let { commentId } = req.query;
      let result='删除成功';
      result=(await services.deleteComment(commentId)) || '';
      res.send(result);
    }catch(e){
      res.send(e);
    }
  }
};
