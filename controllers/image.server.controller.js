const services = require("../services");

module.exports = {
  // 上传图片
  uploadImage: async (req, res) => {
    try {
      // TODO:
      console.log("uploadImage:", req.body);
      let result = true;
      //   result = (await services.queryFeatureList()) || [];
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
};
