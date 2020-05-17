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
  //删除景点分类
  deleteClassify: (classifyId) => {
    return new Promise((resolve, reject) => {
      console.log(classifyId)
      try {
        sql = `update classify set isDel=1 where classifyId = '${classifyId}'`;
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
