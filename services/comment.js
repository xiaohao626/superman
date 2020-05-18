const db = require("../config/db");
const global = require("../config/global");
const tool = require("../tool");
const sqlTool = require("../tool/sql");

module.exports = {
  // 通过套餐Id查询对应评价列表
  queryCommentByCombosId: (combosId) => {
    return new Promise((resolve, reject) => {
      try {
        const time = sqlTool.fmtTimePrecise("time");
        const sql = `select *,${time} from comment where combosId = '${combosId}' order by id desc`;

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
  /**
   * 生成评价
   * @param {Object} params 参数
   * @property {Number} params.uid 用户Id
   * @property {Number} params.combosId 套餐Id
   * @property {Number} params.comment 评价内容
   * @property {Number} params.rate 评价评分
   */
  createComment: (params = {}) => {
    return new Promise((resolve, reject) => {
      try {
        const { uid, combosId, comment, rate, nickName, gender } = params || {};
        const commentId = tool.guidNum(global.uniqueCodePrefix.commentId);
        const keys =
          "commentId,content,time,combosId,star,userId,nickName,userGender";
        const values = `${commentId},'${comment}',now(),${combosId},${rate},${uid},'${nickName}',${gender}`;
        const sql = `insert into comment (${keys}) values (${values})`;

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
        const keys = `id,commentId,content,${sqlTool.fmtTimePrecise(
          "time"
        )},combosId,star,nickName,userId,userGender`;
        const sql = `select ${keys} from comment`;
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
