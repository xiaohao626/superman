const db = require("../config/db");

module.exports = {
  // 获取景点classify列表
  getClassifyList: () => {
    return new Promise((resolve, reject) => {
      try {
        sql = `select * from classify`;
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
