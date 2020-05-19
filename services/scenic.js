const db = require("../config/db");


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
  
};
