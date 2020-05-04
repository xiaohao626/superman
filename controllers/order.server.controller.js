const services = require("../services");
const tool = require("../tool");
// const date = require("../tool/date");
const global = require("../config/global");

module.exports = {
  // 生成订单
  createOrder: async (req, res) => {
    try {
      let result = {};
      let { query = {} } = req || {};
      let _query = query;
      // 生成订单号
      _query.number = tool.guidNum(global.uniqueCodePrefix.orderNumber);

      insertRes = (await services.createOrder(_query)) || [];

      if (insertRes.insertId) {
        const orderRes =
          (await services.queryOrderById(insertRes.insertId))[0] || null;
        const combosRes =
          (await services.queryCombosDetail(orderRes.combosId))[0] || null;
        result.order = orderRes;
        result.combos = combosRes;
      }

      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  // 根据uid查询用户订单列表
  createOrder: async (req, res) => {
    try {
      let result = {};
      let { query = {} } = req || {};
      let _query = query;
      // 生成订单号
      _query.number = tool.guidNum(global.uniqueCodePrefix.orderNumber);

      insertRes = (await services.createOrder(_query)) || [];

      if (insertRes.insertId) {
        const orderRes =
          (await services.queryOrderById(insertRes.insertId))[0] || null;
        const combosRes =
          (await services.queryCombosDetail(orderRes.combosId))[0] || null;
        result.order = orderRes;
        result.combos = combosRes;
      }

      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  // 根据用户id查询用户订单
  queryOrderListByUid: async (req, res) => {
    try {
      let result = [];
      const { uid = "" } = req.query || {};

      if (uid) {
        const list = (await services.queryOrderListByUid(uid)) || [];
        if (Array.isArray(list) && list.length) {
          result = list;
          let resultPromise = result.map((order) => joinCombos(order));
          await Promise.all(resultPromise);
        }
      }

      res.send(result);

      async function joinCombos(_order) {
        let order = _order;
        let combos =
          (await services.queryCombosDetail(order.combosId))[0] || null;

        order.combos = combos;

        return order;
      }
    } catch (e) {
      res.send(e);
    }
  },
};
