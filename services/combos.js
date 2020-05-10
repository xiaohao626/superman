const db = require("../config/db");

module.exports = {
  /**
   * 根据套餐特点分类获取套餐列表
   * https://www.yuque.com/zhanghao-hr3kc/qg1pgz/tec7hg#DlgB1
   * @param {String} classify 分类key值
   */
  getCombosWithClassifyList: (classify) => {
    return new Promise((resolve, reject) => {
      try {
        sql = `select * from combos where classify like '%${classify}%'`;
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
};
