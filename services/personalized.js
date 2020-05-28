const db = require("../config/db");

module.exports = {
  // 通过用户Id查询个性化推荐
  queryPersonalizedByUid: () => {
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
};
