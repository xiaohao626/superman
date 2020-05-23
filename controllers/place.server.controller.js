const services = require("../services");

module.exports = {
  // 查询所有景点
  queryAllPlace: async (req, res) => {
    try {
      let result = [];
      let {
        query = {}
      } = req;
      let {
        scenicId = "", featureId = ""
      } = query || {};
      const params = {
        scenicId,
        featureId
      };

      result = (await services.selectPlaceList(params)) || [];
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  // 获取景点详细信息
  // getPlaceDetail: async (req, res) => {
  //   try {
  //     let result = [];
  //     const { id } = req.query || {};

  //     if (id) {
  //       result = (await services.selectPlaceDetail(id)) || [];
  //     }

  //     res.send(result);
  //   } catch (e) {
  //     res.send(e);
  //   }
  // },
  // 根据景点Id查询景点详细信息
  queryPlaceDetailById: async (req, res) => {
    try {
      let detail = {};
      const {
        placeId = ""
      } = req.query || {};

      if (placeId) {
        detail = (await services.queryPlaceDetailById(placeId))[0] || [];
      }

      // 组装包含套餐
      if (detail.placeId) {
        const params = {
          placeId: detail.placeId
        };
        const combosList =
          (await services.queryCombosListByParams(params)) || [];

        detail.combosList = combosList;
      }

      res.send(detail);
    } catch (e) {
      res.send(e);
    }
  },
  //查询所有景点
  queryAllPlace: async (req, res) => {
    try {
      let result = [];
      let {
        query = {}
      } = req;
      let {
        scenicId = "", featureId = ""
      } = query || {};
      const params = {
        scenicId,
        featureId
      };

      result = (await services.selectPlaceList(params)) || [];
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  //新增景点
  createPlace: async (req, res) => {
    try {
      let result = [];
      let {
        title,
        introduce,
        price,
        feature,
        scenicType,
        classify,
        address,days
      } = req.query;
      result = (await services.createPlace(title,
        introduce,
        price,
        feature,
        scenicType,
        classify,
        address,days)) || [];
      res.send("新增成功");
    } catch (e) {
      res.send(e);
    }
  },
  //修改景点
  updataPlaceById: async (req, res) => {
    try {
      let {
        placeId,
        title,
        introduce,
        price,
        feature,
        scenicType,
        classify,
        address,days
      } = req.query;
      let result = '';
      result = (await services.updataPlaceById(placeId,
        title,
        introduce,
        price,
        feature,
        scenicType,
        classify,
        address,days)) || '';
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  //删除景点
  deletePlace: async (req, res) => {
    try {
      let {
        placeId
      } = req.query;
      let result = '删除成功';
      result = (await services.deletePlace(placeId)) || '';
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }
};