const db = require("../config/db");

module.exports = {
  // 获取景点星级列表
  queryFeatureList: () => {
    return new Promise((resolve, reject) => {
      try {
        sql = `select * from feature`;
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
