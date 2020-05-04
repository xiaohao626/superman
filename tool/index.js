const date = require("./date");

// 生成唯一id（字母加数字）
function guid() {
  return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(
    36
  );
}

// 生成唯一id（纯数字）
function guidNum(prefixNum) {
  let pre = prefixNum || "";
  return `${pre}${date.getDateTimeStamp()}`;
}

module.exports = {
  guid,
  guidNum,
};
