const db = require("../config/db");
const global = require("../config/global");
const tool = require("../tool");

module.exports = {
  // 验证登录
  verifyUserLogin(params = {}) {
    return new Promise((resolve, reject) => {
      try {
        let { userName } = params;
        sql = `select * from user where name = '${userName}'`;
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
  // 通过uid查询用户信息
  queryUserDetail: (uid) => {
    return new Promise((resolve, reject) => {
      try {
        if (!uid) {
          resolve(null);
        }
        const sql = `select * from user where uid = ${uid}`;
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
  // 查询所有用户列表
  queryUserList: () => {
    return new Promise((resolve, reject) => {
      try {
        const sql = `select * from user where isDel=0`;
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
  //注册
  createUser: (name,nickName,age,pwd,sex,phone,scenic,hobby) => {
    return new Promise((resolve, reject) => {
      try {
        const uid = tool.guidNum(global.uniqueCodePrefix.uid);
        const keys = "uid,name,nickName,age,pwd,sex,phone,scenic,hobby,isDel";
        const values = `${uid},'${name}','${nickName}',${age},'${pwd}','${sex}','${phone}','${scenic}','${hobby}',0`;
        const sql = `insert into user (${keys}) values (${values})`;
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
  //删除用户
  delUser: (params = {}) => {
    return new Promise((resolve, reject) => {
      try {
        let { id } = params;
        const sql = `update user set isdelete=1 where id = '${id}'`;
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
   * 通过用户Id查询用户信息
   * @param {Object} params 参数对象
   * @property {String} params.uid 用户Id
   */
  queryUserInfoByUid: (params = {}) => {
    return new Promise((resolve, reject) => {
      try {
        let { uid } = params || {};
        const sql = `select * from user where uid = '${uid}'`;
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
   * 通过用户Id修改用户信息
   * @param {Object} params 参数对象
   * @property {String} params.uid 用户Id
   */
  editUserInfoByUid: (params = {}) => {
    return new Promise((resolve, reject) => {
      try {
        const { uid, name, nickName, pwd, age, sex, phone } = params || {};
        const sql = `update user set name="${name}",nickName="${nickName}",pwd=${pwd},age=${age},sex=${sex},phone=${phone} where uid = ${uid}`;

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
