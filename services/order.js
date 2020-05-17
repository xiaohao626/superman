const db = require("../config/db");
const sqlTool = require("../tool/sql");

module.exports = {
  // 生成订单
  createOrder: (params = {}) => {
    return new Promise((resolve, reject) => {
      try {
        let {
          uid = null,
          combosId = null,
          number = null,
          copies = null,
          realPrice = null,
          selectDate = null,
          complete = 1,
          title = null,
        } = params;

        const keys = `uid,combosId,number,copies,createTime,realPrice,selectDate,complete,title`;
        const values = `${uid},${combosId},${number},${copies},now(),${realPrice},FROM_UNIXTIME(${
          selectDate / 1000
        },'%Y-%m-%d %H:%i:%s'),${complete},'${title}'`;

        const sql = `insert into orderList (${keys}) values (${values})`;

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
  // 通过id查询订单
  queryOrderById: (id) => {
    return new Promise((resolve, reject) => {
      try {
        const keys = `combosId,number,${sqlTool.fmtTimePrecise(
          "createTime"
        )},realPrice,${sqlTool.fmtTimeSimple(
          "selectDate"
        )},complete,${sqlTool.fmtTimeSimple("completeTime")}`;

        sql = `select ${keys} from orderList where id = '${id}' and isDel = 0`;

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
  // 通过用户id[用户搜索]查询订单列表
  queryOrderListByUid: (uid, searchOrderKey = "") => {
    return new Promise((resolve, reject) => {
      try {
        const createTime = sqlTool.fmtTimePrecise("createTime");
        const selectDate = sqlTool.fmtTimeSimple("selectDate");
        const completeTime = sqlTool.fmtTimePrecise("completeTime");
        const searchOrderSql = searchOrderKey
          ? ` and title like '%${searchOrderKey}%'`
          : "";
        const keys = `uid,combosId,number,copies,${createTime},realPrice,${selectDate},complete,${completeTime},alreadyComment`;

        const sql = `select ${keys} from orderList where uid = '${uid}'${searchOrderSql} and isDel = 0 order by id desc`;

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
   * 根据用户Id & 订单编号查询订单详情
   * @param {Object} params 参数
   * @property {String} params.uid 用户Id
   * @property {String} params.number 订单编号
   */
  queryOrderDetailByUidAndNumber: (params = {}) => {
    return new Promise((resolve, reject) => {
      try {
        const { uid, number } = params || {};
        const keys = `uid,combosId,number,copies,${sqlTool.fmtTimePrecise(
          "createTime"
        )},realPrice,${sqlTool.fmtTimeSimple(
          "selectDate"
        )},complete,${sqlTool.fmtTimePrecise("completeTime")}`;

        const sql = `select ${keys} from orderList where uid = ${uid} and number = ${number}`;

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
   * 通过订单编号完成订单
   * @param {String} number 订单编号
   */
  completeOrderByNumber: (number) => {
    return new Promise((resolve, reject) => {
      try {
        if (!number) {
          resolve(null);
        }

        const sql = `update orderList set complete=2,completeTime=now() where number = ${number}`;

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
   * 通过订单编号删除订单
   * @param {String} number 订单编号
   */
  deleteOrderByNumber: (number) => {
    return new Promise((resolve, reject) => {
      try {
        if (!number) {
          resolve(null);
        }

        const sql = `update orderList set isDel=1 where number = ${number}`;

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
   * 修改订单是否可以评论
   * @param {String} params 参数
   */
  setOrderAlreadyComment: (params = {}) => {
    return new Promise((resolve, reject) => {
      try {
        const { number, alreadyComment = 0 } = params || {};
        const sql = `update orderList set alreadyComment=${alreadyComment} where number = ${number}`;

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
  //删除订单
  deleteOrder: (number) => {
    return new Promise((resolve, reject) => {
      try {
        sql = `update orderList set isDel=1 where number = '${number}'`;
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
