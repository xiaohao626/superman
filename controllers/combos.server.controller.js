const services = require("../services");

module.exports = {
  // 获取套餐列表
  getCombosList: async (req, res, next) => {
    try {
      let list = [];
      let classifyRes = await services.getClassifyList();

      for (let i in classifyRes) {
        let { key, title } = classifyRes[i];
        let item = (await services.getCombosWithClassifyList(key)) || [];
        list.push({
          title,
          list: item
        });
      }
      res.send(list);
    } catch (e) {
      res.send(e);
    }
  },
  // 模糊查询套餐列表
  fuzzyQueryCombosList: async (req, res) => {
    try {
      let { value = "" } = req.query;
      let queryRes = (await services.fuzzySearchCombos(value)) || [];
      res.send(queryRes);
    } catch (e) {}
  },
  // 获取套餐详情
  getCombosDetail: async (req, res) => {
    try {
      let result = [];
      const { id } = req.query || {};

      if (id) {
        result = (await services.queryCombosDetail(id)) || [];
      }

      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }
};
