const db = require("../config/db");

module.exports = {
  // 新增浏览记录
  createBrowseRecord: (params = {}) => {
    return new Promise((resolve, reject) => {
      try {
        const { browse_id, browse_type, browse_type_id, browse_uid } =
          params || {};

        const keys = "browse_id,browse_type,browse_uid,browse_type_id";
        const values = `${browse_id},${browse_type},${browse_uid},${browse_type_id}`;
        const sql = `insert into browseRecords (${keys}) values (${values})`;

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
  //   按照出现的次数排序浏览记录
  queryOrderRecord: (params = {}) => {
    return new Promise((resolve, reject) => {
      try {
        const { browse_type, browse_uid, limit = 10 } = params || {};

        const sql = `SELECT browse_type_id,browse_type,count( * ) AS count
                        FROM browseRecords
                        WHERE browse_type = ${browse_type} AND browse_uid = ${browse_uid}
                        GROUP BY browse_type_id,browse_type
                        ORDER BY count DESC
                        LIMIT ${limit}
                        `;

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
