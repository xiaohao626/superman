const db = require("../config/db");

module.exports = {
  // 新增图片
  createImageRecord: (params = {}) => {
    return new Promise((resolve, reject) => {
      try {
        const { url, type, relevanceId } = params || {};
        // TODO:
        console.log(params);
        const keys = "url,type,relevanceId";
        const values = `'${url}',${type},${relevanceId}`;
        const sql = `insert into images (${keys}) values (${values})`;

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
