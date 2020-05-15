const services = require("../services");

module.exports = {
  queryCommentListByCombosId: async (req, res) => {
    try {
      let result = [];
      const { combosId } = req.query || {};
      let queryRes = (await services.queryCommentByCombosId(combosId)) || [];

      if (queryRes && queryRes.length) {
        result = queryRes;
      }

      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
};
