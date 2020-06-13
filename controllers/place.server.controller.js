const services = require("../services");
const globalConfig = require("../config/global");
const tool = require("../tool");

module.exports = {
  // 查询所有景点
  queryAllPlace: async (req, res) => {
    try {
      let result = [];
      let { scenicId = "", featureId = "" } = req.query || {};
      const params = {
        scenicId,
        featureId,
      };

      result = (await services.selectPlaceList(params)) || [];
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  // 根据景点Id查询景点详细信息
  queryPlaceDetailById: async (req, res) => {
    try {
      let detail = {};
      const { placeId = "", uid = "" } = req.query || {};

      if (placeId) {
        detail = (await services.queryPlaceDetailById(placeId))[0] || {};
      }

      // 组装包含套餐
      if (detail.placeId) {
        const params = {
          placeId: detail.placeId,
        };
        const combosList =
          (await services.queryCombosListByParams(params)) || [];

        detail.combosList = combosList;
      }

      // 组装景点图片列表
      if (detail.placeId) {
        const type = globalConfig.uniqueCodePrefix.placeId;
        const queryImagesResult =
          (await services.queryImageByTypeAndRelevaceId(
            type,
            detail.placeId
          )) || [];

        detail.images = queryImagesResult;
      }

      res.send(detail);

      // 生成浏览记录
      if (detail.scenicId) {
        // split方法将字符串转换成数组 001,002 => [001, 002]
        const scenicIdList = detail.scenicId.split(",");

        const createRecordPromise = scenicIdList.map((scenicId) => {
          const createRecordParam = {
            browse_type: globalConfig.uniqueCodePrefix.placeId,
            browse_type_id: scenicId,
            browse_uid: uid,
          };
          return createBrowseRecord(createRecordParam);
        });

        Promise.all(createRecordPromise);
      }

      // 生成浏览记录方法
      async function createBrowseRecord(params = {}) {
        const { browse_type, browse_type_id, browse_uid } = params || {};

        // 生成浏览记录Id
        const browseRecordId = tool.guidNum(
          globalConfig.uniqueCodePrefix.browseRecords
        );

        const serviceParams = {
          browse_id: browseRecordId,
          browse_type,
          browse_type_id,
          browse_uid,
        };

        await services.createBrowseRecord(serviceParams);
      }
    } catch (e) {
      res.send(e);
    }
  },
  //查询所有景点
  queryAllPlace: async (req, res) => {
    try {
      let result = [];
      let { query = {} } = req;
      let { scenicId = "", featureId = "" } = query || {};
      const params = {
        scenicId,
        featureId,
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
        address,
        days,
        fileList,
      } = req.body;

      let imgList = Array.isArray(fileList) ? fileList : [fileList];
      imgList = imgList.filter((img) => !!img);
      // 生成唯一景点编号
      const placeId = tool.guidNum(globalConfig.uniqueCodePrefix.placeId);
      // 景点封面图（默认取上传的第一张图片）
      const [img = ""] = imgList || [];

      result =
        (await services.createPlace(
          placeId,
          title,
          introduce,
          price,
          feature,
          scenicType,
          img,
          classify,
          address,
          days,
          imgList
        )) || [];

      // 添加失败
      if (!result || !result.affectedRows) {
        res.send({ success: false });
        return;
      }

      services.generateMoreImgRecord(
        imgList,
        globalConfig.uniqueCodePrefix.placeId,
        placeId
      );

      res.send({ success: true });
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
        address,
        days,
      } = req.query;
      let result = "";
      result =
        (await services.updataPlaceById(
          placeId,
          title,
          introduce,
          price,
          feature,
          scenicType,
          classify,
          address,
          days
        )) || "";
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  //删除景点
  deletePlace: async (req, res) => {
    try {
      let { placeId } = req.query;
      let result = "删除成功";
      result = (await services.deletePlace(placeId)) || "";
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
};
