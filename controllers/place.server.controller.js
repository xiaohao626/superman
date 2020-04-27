const services = require("../services");

module.exports = {
  // 获取景点详细信息
  getPlaceDetail: async (req, res) => {
    try {
      let result = [];
      const { id } = req.query || {};

      if (id) {
        result = (await services.selectPlaceDetail(id)) || [];
      }

      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }
};
