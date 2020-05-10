const services = require("../services");

module.exports = {
  // 查询景点特色列表
  queryScenicList: async (req, res) => {
    try {
      let result = [];

      result = (await services.queryScenicList()) || [];
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
};
