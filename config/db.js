var mysql = require("mysql");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "111111",
  database: "lovetravel"
};
// const dbConfig = {
//   host: "192.168.50.107",
//   user: "kangjian",
//   password: "111111",
//   database: "loveTravel"
// };

const TABLE_NAME = {
  USER: "user", // 用户
  PLACE_LIST: "placeList", // 景区列表
  PLACE_CLASSIFY: "placeClassify" // 景点分类
};

var pool = mysql.createPool(dbConfig); //数据库连接配置

function query(sql, callback) {
  pool.getConnection(function(err, connection) {
    connection.query(sql, function(err, rows) {
      callback(err, rows);
      connection.release();
    });
  });
} //对数据库进行增删改查操作的基础

exports.query = query;
exports.TABLE_NAME = TABLE_NAME;
