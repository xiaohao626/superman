const db = require("../config/db");

module.exports = {
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
  queryUserList: () => {
    return new Promise((resolve, reject) => {
      try {
        // TODO:
        const sql = `select * from user`;
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
  delUser: (params = {}) => {
    return new Promise((resolve, reject) => {
      try {
        let { id } = params;
        sql = `delete from user where id = '${id}'`;
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

// let show = () => {
//   return new Promise((resolve, reject) => {
//     db.query(`select * from user`, (err, rows) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(rows);
//     });
//   });
// }; //显示全部 （select*）

// let select = (attributename, attribute) => {
//   return new Promise((resolve, reject) => {
//     db.query(
//       `select * from user where ${attributename} = '${attribute}'`,
//       (err, rows) => {
//         if (err) {
//           reject(err);
//         }
//         resolve(rows);
//       }
//     );
//   });
// }; //查询一行（传参)

// let update = (updateattributename, newdata, attributename, attribute) => {
//   return new Promise((resolve, reject) => {
//     db.query(
//       `update user set ${updateattributename} = '${newdata}' where ${attributename} = '${attribute}'`,
//       (err, rows) => {
//         if (err) {
//           reject(err);
//         }
//         resolve(rows);
//       }
//     );
//   });
// }; //修改

// let insert = (attributenames, attributes) => {
//   return new Promise((resolve, reject) => {
//     db.query(
//       `insert into user ${attributenames} values ${attributes}`,
//       (err, rows) => {
//         if (err) {
//           reject(err);
//         }
//         resolve(rows);
//       }
//     );
//   });
// }; //增加

// exports.show = show;
// exports.select = select;
// exports.update = update;
// exports.insert = insert;
