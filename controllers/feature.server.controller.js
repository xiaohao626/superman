const services = require("../services");

module.exports = {
  // 查询景点星级列表
  queryFeatureList: async (req, res) => {
    try {
      let result = [];

      result = (await services.queryFeatureList()) || [];
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
};
