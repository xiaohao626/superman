const db = require("../config/db");

// 生成图片记录
const createImageRecord = (params = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const { url, type, relevanceId } = params || {};

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
};

// 根据关联类型及关联Id查询图片记录 (type, relevanceId)
const queryImageByTypeAndRelevaceId = (type = "", relevanceId = "") => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `select url from images where type = ${type} and relevanceId = ${relevanceId} and isDel = ${0}`;
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
};

const generateMoreImgRecord = (_imgUrlList = [], type, relevanceId) => {
  try {
    if (!_imgUrlList || !_imgUrlList.length) return;
    let imgUrlList = _imgUrlList.filter((url) => !!url);
    const imgPromises = imgUrlList.map((url) => {
      return createImageRecord({
        url,
        type,
        relevanceId,
      });
    });
    return Promise.all(imgPromises);
  } catch (e) {
    console.log("generateMoreImgRecord:", e);
  }
};

exports.createImageRecord = createImageRecord;
exports.queryImageByTypeAndRelevaceId = queryImageByTypeAndRelevaceId;
exports.generateMoreImgRecord = generateMoreImgRecord;
