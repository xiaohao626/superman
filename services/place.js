// const db = require("../config/db");
// const _query = require("./index");
// const TABLES = db.TABLE_NAME;

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

const db = require("../config/db");

module.exports = {
  // 查询景点列表
  selectPlaceList: (params) => {
    return new Promise((resolve) => {
      const { scenicId = "", featureId = "" } = params || {};
      let sql = `select * from placeList where scenicId like '%${scenicId}%' and feature like '%${featureId}%'`;

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
  // 查询景点详情
  queryPlaceDetailById: (placeId) => {
    return new Promise((resolve, reject) => {
      try {
        sql = `select * from placeList where placeId = '${placeId}'`;
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
  //删除景点
  deletePlace: (placeId) => {
    return new Promise((resolve, reject) => {
      try {
        sql = `update placeList set isDel=1 where placeId = '${placeId}'`;
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
