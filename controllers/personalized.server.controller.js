const services = require("../services");
const globalConfig = require("../config/global");

module.exports = {
  // 通过用户Id查询个性化推荐
  queryPersonalizedByUid: async (req, res) => {
    try {
      let result = {};
      const { uid } = req.query || {};

      // 查询用户信息
      let userInfo = null;
      const userInfoResult = (await services.queryUserDetail(uid)) || [];
      if (Array.isArray(userInfoResult) && userInfoResult.length) {
        userInfo = userInfoResult[0];
      }

      // 景点推荐转换成数组形式
      let scenicIdList = [];
      if (userInfo && userInfo.scenic) {
        scenicIdList = userInfo.scenic.split(",") || [];
      }

      //   根据用户注册偏好（特色）查询景点列表
      let scenicListByHobby = [];
      if (scenicIdList && scenicIdList.length) {
        scenicListByHobby =
          (await services.queryPlaceByScenicId({ scenicIdList })) || [];
      }

      //   查询经常访问同特色景区
      let frequentlyPlaceList = [];
      if (uid) {
        // 查询访问最多景点记录
        const frequentlyRecordParams = {
          browse_type: globalConfig.uniqueCodePrefix.placeId,
          browse_uid: uid,
        };
        const frequentlyRecord = await services.queryOrderRecord(
          frequentlyRecordParams
        );

        if (frequentlyRecord && frequentlyRecord.length) {
          const frequentlyPromise = frequentlyRecord.map((record) => {
            return services.selectPlaceList({
              scenicId: record.browse_type_id,
            });
          });

          frequentlyPlaceList = (await Promise.all(frequentlyPromise)) || [];
          frequentlyPlaceList = frequentlyPlaceList.map(
            (item) => item[0] || null
          );
        }
      }

      result.scenicList = scenicListByHobby;
      result.frequentlyPlaceList = frequentlyPlaceList;
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
};
