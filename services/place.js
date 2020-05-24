const db = require("../config/db");
const global = require("../config/global");
const tool = require("../tool");

module.exports = {
  // 通过指定条件查询景点列表
  selectPlaceList: (params) => {
    return new Promise((resolve) => {
      const { scenicId = "", featureId = "" } = params || {};
      let sql = `select * from placeList where scenicId like '%${scenicId}%' and feature like '%${featureId}%' and isDel=0`;

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
  //新增景点套餐
  createPlace: (
    title,
    introduce,
    price,
    feature,
    scenicType,
    classify,
    address,
    days
  ) => {
    return new Promise((resolve, reject) => {
      try {
        const placeId = tool.guidNum(global.uniqueCodePrefix.placeId);
        const keys =
          "placeId,title,introduce,price,scenicType,scenicId,classify,address,turnover,number,feature,grade,days,isDel";
        const values = `${placeId},'${title}','${introduce}',${price},'${scenicType}','${scenicType}','${classify}','${address}',0,'${placeId}','${feature}',0,${days},0`;
        const sql = `insert into placelist (${keys}) values (${values})`;

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
  //修改景点套餐
  updataPlaceById: (
    placeId,
    title,
    introduce,
    price,
    feature,
    scenicType,
    classify,
    address,
    days
  ) => {
    return new Promise((resolve, reject) => {
      try {
        sql = `update placelist set title="${title}",introduce="${introduce}",price=${price},feature="${feature}",scenicType="${scenicType}",classify="${classify}",scenicType="${scenicType}",classify="${classify}",address="${address}",days=${days} where placeId = ${placeId}`;
        console.log(sql);
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
  /**
   * 通过scenicId查询景点
   * @param {Object} params
   * @property {Array} scenicIdList 特色Id列表
   */
  queryPlaceByScenicId: (params = {}) => {
    return new Promise((resolve, reject) => {
      try {
        const { scenicIdList = [] } = params || {};

        if (!Array.isArray(scenicIdList) || !scenicIdList.length) {
          resolve([]);
        }

        let sqlTerm = "";
        scenicIdList.forEach((scenicId, index) => {
          if (index === scenicIdList.length - 1) {
            sqlTerm = sqlTerm + `scenicId like '%${scenicId}%'`;
          } else {
            sqlTerm = sqlTerm + `scenicId like '%${scenicId}%' or `;
          }
        });

        sql = `select * from placeList where ${sqlTerm} and isDel = 0`;

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
