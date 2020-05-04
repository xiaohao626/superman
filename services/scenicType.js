const db = require("../config/db");

module.exports = {
  // 根据类型id查询相应类型标签
  queryScenicTypeById: (scenicId) => {
    return new Promise((resolve, reject) => {
      try {
        // TODO:
        console.log("scenicIdServicescenicIdscenicId:", scenicId);
        sql = `select * from scenicType where scenicId = '${scenicId}'`;
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
