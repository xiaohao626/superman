const services = require("../services");

module.exports = {
  queryAllPlace: async (req, res) => {
    try {
      let result = [];

      result = (await services.selectPlaceList()) || [];
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
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
  },
  // 根据景点Id查询景点详细信息
  queryPlaceDetailById: async (req, res) => {
    try {
      let detail = {};
      const { placeId = "" } = req.query || {};

      if (placeId) {
        detail = (await services.queryPlaceDetailById(placeId))[0] || [];
      }

      res.send(detail);
    } catch (e) {
      res.send(e);
    }
  },
};
