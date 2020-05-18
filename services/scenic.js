const db = require("../config/db");
const global = require("../config/global");
const tool = require("../tool");

module.exports = {
  // 获取特色列表
  queryScenicList: () => {
    return new Promise((resolve, reject) => {
      try {
        sql = `select * from scenicType`;
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
  //新增景点分类
  createScenicType: (typeName) => {
    return new Promise((resolve, reject) => {
      try {
        const scenicId = tool.guidNum(global.uniqueCodePrefix.scenicId);
        console.log('scenicId',scenicId)
        const keys ="scenicId,typeName,isDel";
        const values = `${scenicId},'${typeName}',${0}`;
        console.log('value',values)
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
  //修改景点分类
  updataByScenicId: (scenicId,typeName) => {
    return new Promise((resolve, reject) => {
      console.log(scenicId,typeName)
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
  //删除景点分类
  deleteClassify: (classifyId) => {
    return new Promise((resolve, reject) => {
      console.log(classifyId)
      try {
        sql = `update classify set isDel=1 where classifyId = '${classifyId}'`;
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
