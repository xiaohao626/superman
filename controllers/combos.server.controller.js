const services = require("../services");

module.exports = {
  // 获取套餐列表
  getCombosList: async (req, res, next) => {
    try {
      let list = [];
      // 查询景点类型列表
      let classifyRes = await services.queryClassifyList();

      for (let i in classifyRes) {
        let { classifyId, title } = classifyRes[i];
        let combosList =
          (await services.getCombosWithClassifyList(classifyId)) || [];
        if (combosList && combosList.length) {
          list.push({
            title,
            list: combosList,
          });
        }
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
      let result = {};
      const { combosId } = req.query || {};

      if (combosId) {
        const detail = (await services.queryCombosDetail(combosId)) || [];
        result.combosDetail = detail[0] || null;
      }

      // 获取套餐中景点列表
      if (result.combosDetail) {
        let { placeIdListStr = "" } = result.combosDetail || {};
        let placeIdList = placeIdListStr.split(",");

        if (Array.isArray(placeIdList) && placeIdList.length) {
          const placeIdPromiseList = placeIdList.map((placeId) => {
            return services.queryPlaceDetailById(placeId);
          });
          let placeRes = await Promise.all(placeIdPromiseList);

          result.combosDetail.placeList = placeRes
            .map((item) => item[0])
            .filter((item) => !!item);
        }
      }

      // 获取套餐标签列表
      if (result.combosDetail) {
        // scenicType字段存储的是scenicId列表
        let { scenicType = "" } = result.combosDetail || {};
        let scenicIdList = scenicType.split(",");

        if (Array.isArray(scenicIdList) && scenicIdList.length) {
          const scenicPromiseList = scenicIdList.map((scenicId) => {
            return services.queryScenicTypeById(scenicId);
          });
          let scenicRes = await Promise.all(scenicPromiseList);

          result.combosDetail.scenicTipList = scenicRes
            .map((item) => item[0])
            .filter((item) => !!item);
        }
      }

      if (result.combosDetail && combosId) {
        result.comment = await services.queryCommentByCombosId(combosId);
      }

      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  //获取套餐列表
  queryCombosList: async (req, res) => {
    try {
      let result = [];
      result = (await services.queryCombosList()) || [];
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  //新增景点套餐
  createCombos: async (req, res) => {
    try {
      let result = [];
      let {
        title,
        subTitle,
        img,
        days,
        price,
        introduce,
        placeIdListStr,
        scenicType,
        classify,
        keyword,
      } = req.query;
      result =
        (await services.createCombos(
          title,
          subTitle,
          img,
          days,
          price,
          introduce,
          placeIdListStr,
          scenicType,
          classify,
          keyword
        )) || [];
      res.send("新增成功");
    } catch (e) {
      res.send(e);
    }
  },
  //修改景点套餐
  updataCombosByNumber: async (req, res) => {
    try {
      console.log(1);
      let {
        number,
        title,
        subTitle,
        days,
        price,
        introduce,
        placeIdListStr,
        scenicType,
        classify,
        keyword,
      } = req.query;
      let result = "";
      result =
        (await services.updataCombosByNumber(
          number,
          title,
          img,
          subTitle,
          days,
          price,
          introduce,
          placeIdListStr,
          scenicType,
          classify,
          keyword
        )) || "";
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  //删除景点套餐
  deleteCombos: async (req, res) => {
    try {
      let { id } = req.query;
      let result = "删除成功";
      result = (await services.deleteCombos(id)) || "";
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
};
