// const db = require("../config/db");
// const _query = require("./index");
// const TABLES = db.TABLE_NAME;

// 查找所有景点
// let queryPlaceList = async () => {
//   return new Promise((resolve, reject) => {
//     db.query(`select * from ${TABLES.PLACE_CLASSIFY}`, (err, rows) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(rows);
//     });
//   });
// };

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

// exports.queryPlaceList = queryPlaceList;

// exports.select = select;
// exports.update = update;
// exports.insert = insert;

const db = require("../config/db");

module.exports = {
  selectPlaceList: () => {
    return new Promise((resolve) => {
      let sql = `select * from placeList`;
      db.query(sql, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  },
  // 查询景点详情
  selectPlaceDetail: (number) => {
    return new Promise((resolve, reject) => {
      try {
        sql = `select * from placeList where number = '${number}'`;
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
