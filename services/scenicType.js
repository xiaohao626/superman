const db = require("../config/db");

module.exports = {
  // 根据类型id查询相应类型标签
  queryScenicTypeById: (scenicId) => {
    return new Promise((resolve, reject) => {
      try {
        // TODO:
        console.log("scenicIdServicescenicIdscenicId:", scenicId);
        sql = `select * from scenicType where scenicId = '${scenicId}'`;
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
  //查询所有的景点类型
  queryTypeList: () => {
    return new Promise((resolve, reject) => {
      try {
        // TODO:
       const sql = `select * from scenicType`;
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
  //删除景点类型
  deleteScenicTpye: (scenicId) => {
    return new Promise((resolve, reject) => {
      try {
        sql = `update scenicType set isDel=1 where scenicId = '${scenicId}'`;
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
