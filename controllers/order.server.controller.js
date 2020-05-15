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
      // 获取套餐标题
      if (_query.combosId) {
        const preCombosInfo =
          (await services.queryCombosDetail(_query.combosId))[0] || {};

        if (preCombosInfo.title) {
          _query.title = preCombosInfo.title;
        }
      }

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
  // 根据用户id[用户搜索]查询用户订单列表
  queryOrderListByUid: async (req, res) => {
    try {
      let result = [];
      const { uid = "", searchOrderKey = "" } = req.query || {};

      if (uid) {
        const list =
          (await services.queryOrderListByUid(uid, searchOrderKey)) || [];
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
  // 根据订单编号完成订单
  completeOrderByNumber: async (req, res) => {
    try {
      let { number = "" } = req.query || {};
      if (!number) {
        res.send(null);
      }

      let result = {
        success: false,
      };
      let updateRes = (await services.completeOrderByNumber(number)) || [];

      if (updateRes && updateRes.affectedRows) {
        result.success = true;
      }

      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  // 根据订单编号删除订单
  deleteOrderByNumber: async (req, res) => {
    try {
      let { number = "" } = req.query || {};
      if (!number) {
        res.send(null);
      }

      let result = {
        success: false,
      };
      let updateRes = (await services.deleteOrderByNumber(number)) || [];

      // TODO:
      console.log("updateRes");

      if (updateRes && updateRes.affectedRows) {
        result.success = true;
      }

      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
};
