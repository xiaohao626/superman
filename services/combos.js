const db = require("../config/db");
const global = require("../config/global");
const tool = require("../tool");

module.exports = {
  /**
   * 根据套餐特点分类获取套餐列表
   * https://www.yuque.com/zhanghao-hr3kc/qg1pgz/tec7hg#DlgB1
   * @param {String} classifyId 分类key值
   */
  getCombosWithClassifyList: (classifyId) => {
    return new Promise((resolve, reject) => {
      try {
        sql = `select * from combos where classify like '%${classifyId}%'`;
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
  // 模糊搜索套餐
  fuzzySearchCombos: async (value) => {
    return new Promise((resolve) => {
      try {
        let sql = `select * from combos where title like '%${value}%'`;

        db.query(sql, (err, rows) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        });
      } catch (e) {}
    });
  },
  // 查询套餐详情
  queryCombosDetail: (combosId) => {
    return new Promise((resolve, reject) => {
      try {
        sql = `select * from combos where combosId = '${combosId}'`;
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
   * 通过约束条件查询套餐列表
   * @param {Object} params 需要匹配的字段
   * @property {String} params.placeId 景点Id
   */
  queryCombosListByParams: (params = {}) => {
    return new Promise((resolve, reject) => {
      try {
        // placeId
        const { placeId = "" } = params || {};

        sql = `select * from combos where placeIdListStr like '%${placeId}%'`;
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
  // 获取景点套餐列表
  queryCombosList: () => {
    return new Promise((resolve, reject) => {
      try {
        sql = `select * from combos where isDel=0`;
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
  //新增景点套餐
  createCombos: (title,subTitle,img,days,price,introduce,placeIdListStr,scenicType,classify,keyword) => {
    return new Promise((resolve, reject) => {
      try {
        const number = tool.guidNum(global.uniqueCodePrefix.combosId);
        const keys = "number,title,subTitle,img,days,price,introduce,placeIdListStr,scenicType,classify,rate,keyword,combosId,isDel";
        const values = `${number},'${title}','${subTitle}','${img}',${days},${price},'${introduce}','${placeIdListStr}','${scenicType}','${classify}',0,'${keyword}',${number},0`;
        const sql = `insert into combos (${keys}) values (${values})`;
        console.log(sql)
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
  //修改景点套餐
  updataCombosByNumber: (number,title,subTitle,img,days,price,introduce,placeIdListStr,scenicType,classify, keyword) => {
    return new Promise((resolve, reject) => {
      try {
        sql = `update combos set title="${title}",subTitle="${subTitle}",img="${img}",days=${days},price="${price}",introduce="${introduce}",placeIdListStr="${placeIdListStr}",scenicType="${scenicType}",classify="${classify}",keyword="${keyword}" where number = ${number}`;
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
  //删除景点套餐
  deleteCombos: (id) => {
    return new Promise((resolve, reject) => {
      try {
        sql = `update combos set isDel=1 where id = '${id}'`;
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
