// 获取日期
function getDate() {
  return new Date();
}

// 获取日期时间戳
function getDateTimeStamp() {
  return getDate().getTime();
}

// 生成特定格式时间 yyyy-MM-dd m:i:s
function fmtDate(time = +new Date()) {
  var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
  return date.toJSON().substr(0, 19).replace("T", " ");
}

module.exports = {
  getDate,
  getDateTimeStamp,
  fmtDate,
};
