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
  // 生成评价
  createComment: async (req, res) => {
    try {
      let result = { success: false };
      const { number, uid, combosId, comment, rate } = req.query || {};
      // 首先查询用户信息
      let queryRes = null;
      if (uid) {
        let userInfo = (await services.queryUserDetail(uid)) || [];
        if (Array.isArray(userInfo) && userInfo.length) {
          const user = userInfo[0];
          const { nickName = "", gender = "2" } = user || {};
          const params = { uid, combosId, comment, rate, nickName, gender };

          queryRes = (await services.createComment(params)) || null;
        }
      }

      // 将评价状态置为已评价
      let setCommentRes = null;
      if (queryRes && queryRes.insertId) {
        const params = { number, alreadyComment: 1 };
        setCommentRes = await services.setOrderAlreadyComment(params);
      }

      if (
        queryRes &&
        queryRes.insertId &&
        setCommentRes &&
        setCommentRes.affectedRows
      ) {
        result.success = true;
        result.insertId = queryRes.insertId;
      }

      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
};
