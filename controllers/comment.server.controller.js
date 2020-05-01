const services = require("../services");

module.exports = {
  queryCommentByCombosId: async (req, res) => {
    try {
      let result = [];
      const { combosId } = req.query || {};
      result = (await services.selectPlaceList()) || [];
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
};
