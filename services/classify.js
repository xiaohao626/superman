const db = require("../config/db");
const global = require("../config/global");
const tool = require("../tool");

module.exports = {
  // 获取景点classify列表
  queryClassifyList: () => {
    return new Promise((resolve, reject) => {
      try {
        sql = `select * from classify where isDel=0`;
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
  createClassify: (title) => {
    return new Promise((resolve, reject) => {
      try {
        const classifyId = tool.guidNum(global.uniqueCodePrefix.classifyId);
        const keys ="classifyId,title,isDel";
        const values = `${classifyId},'${title}',0`;
        const sql = `insert into classify (${keys}) values (${values})`;
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
  updataByclassifyId: (classifyId,title) => {
    return new Promise((resolve, reject) => {
      try {
        sql = `update classify set title="${title}" where classifyId = ${classifyId}`;
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
        sql = `update classify set isDel=1 where classifyId = ${classifyId}`;
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
