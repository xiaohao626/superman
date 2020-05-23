const db = require("../config/db");
const global = require("../config/global");
const tool = require("../tool");

module.exports = {
  // 根据类型id查询相应类型标签
  queryScenicTypeById: (scenicId) => {
    return new Promise((resolve, reject) => {
      try {
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
        const sql = `select * from scenicType where isDel=0`;
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
  //新增景点类型
  createScenicType: (typeName) => {
    return new Promise((resolve, reject) => {
      try {
        const scenicId = tool.guidNum(global.uniqueCodePrefix.scenicId);
        const keys = "scenicId,typeName,isDel";
        const values = `${scenicId},'${typeName}',0`;
        console.log("value", values);
        const sql = `insert into scenicType (${keys}) values (${values})`;
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
  //修改景点类型
  updataByScenicId: (scenicId, typeName) => {
    return new Promise((resolve, reject) => {
      try {
        sql = `update scenicType set typeName="${typeName}" where scenicId = '${scenicId}'`;
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
