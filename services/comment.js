const db = require("../config/db");

module.exports = {
  // 获取景点classify列表
  queryCommentByCombosId: (combosId) => {
    return new Promise((resolve, reject) => {
      try {
        sql = `select * from comment where combosId = '${combosId}'`;
        // TODO:
        console.log("sql:", sql);
        db.query(sql, (err, rows) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        });
      } catch (e) {
        resolve(null);
      }
    });
  },
   // 获取评论列表
   queryCommentList: () => {
    return new Promise((resolve, reject) => {
      try {
        sql = `select * from comment`;
        db.query(sql, (err, rows) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        });
      } catch (e) {
        resolve(null);
      }
    });
  },
  //删除评论
  deleteComment: (commentId) => {
    return new Promise((resolve, reject) => {
      try {
        sql = `update comment set isDel=1 where commentId = '${commentId}'`;
        db.query(sql, (err, rows) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        });
      } catch (e) {
        resolve(null);
      }
    });
  },
};
