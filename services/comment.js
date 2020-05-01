const db = require("../config/db");

module.exports = {
  // 获取景点classify列表
  queryCommentByCombosId: (combosId) => {
    return new Promise((resolve, reject) => {
      try {
        // TODO:
        console.log("ccccid:", combosId);
        // sql = `select * from combos where number = '${number}'`;
        sql = `select * from comment where combosId = '${combosId}'`;
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
