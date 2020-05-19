const db = require("../config/db");
const global = require("../config/global");
const tool = require("../tool");

module.exports = {
  // 获取景点星级列表
  queryFeatureList: () => {
    return new Promise((resolve, reject) => {
      try {
        sql = `select * from feature where isDel=0`;
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
  //新增景点星级
  createFeature: (featureName) => {
    return new Promise((resolve, reject) => {
      try {
        const featureId = tool.guidNum(global.uniqueCodePrefix.featureId);
        const keys = "featureId,featureName,isDel";
        const values = `${featureId},'${featureName}',0`;
        const sql = `insert into feature (${keys}) values (${values})`;
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
  //修改景点星级
  updataByfeatureId: (featureId, featureName) => {
    return new Promise((resolve, reject) => {
      console.log(featureId, featureName)
      try {
        sql = `update feature set featureName="${featureName}" where featureId = '${featureId}'`;
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
  //删除景点星级
  deleteFeature: (featureId) => {
    return new Promise((resolve, reject) => {
      try {
        sql = `update feature set isDel=1 where featureId = '${featureId}'`;
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