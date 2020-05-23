const user = require("../services/user");
const services = require("../services");

module.exports = {
  getUserlist: function (req, res, next) {
    try {
      const userList = [{ name: "zhang" }];
      return res.send(userList);
    } catch (e) {
      return res.send(e);
    }
  },
  // 用户登录
  userLogin: async function (req, res, next) {
    try {
      let isLegal = false;
      let { userName, userPassword } = req.query;
      let result = await user.verifyUserLogin({ userName });

      if (result && Array.isArray(result) && result.length) {
        let { pwd } = result[0];
        if (pwd === userPassword) {
          isLegal = true;
        }
      }
      let { name, age, sex, uid, phone } = result[0];
      let data = {
        success: true,
        isLegal,
        user: {
          name,
          age,
          sex,
          uid,
          phone,
        },
      };
      res.send(data);
    } catch (e) {
      return res.send(e);
    }
  },
  //获取用户列表
  getUserList: async (req, res) => {
    try {
      let result = [];
      result = (await user.queryUserList()) || [];
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  //删除用户
  deleteUser: async (req, res) => {
    try {
      let { id } = req.query;
      let result = "删除成功";
      result = (await user.delUser({ id })) || "";
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  // 根据用户Id查询用户信息
  queryUserInfoByUid: async (req, res) => {
    try {
      let result = {};
      let { uid } = req.query || {};
      const params = { uid };

      const userResult = (await user.queryUserInfoByUid(params)) || [];

      // 组装用户信息
      if (userResult && userResult.length) {
        let currUser = userResult[0];
        const { scenic = "" } = currUser || {};

        currUser.scenic = scenic.split(",");
        result.userInfo = currUser;
      }

      // 组装scenic信息
      const scenics = (await services.queryScenicList()) || [];
      if (scenics) {
        let scenicMap = {};
        scenics.forEach((scenic) => {
          scenicMap[scenic.scenicId] = scenic;
        });

        result.scenicMap = scenicMap;
      }

      // 组装订单信息
      const orders = (await services.queryOrderListByUid(uid)) || [];
      if (orders) {
        result.orders = orders;
      }

      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  // 根据用户Id修改用户信息
  editUserInfoByUid: async (req, res) => {
    try {
      const { uid, name, nickName, pwd, age, sex, phone } = req.query || {};
      const params = { uid, name, nickName, pwd, age, sex, phone };
      const result = { success: false };
      const editResult = await services.editUserInfoByUid(params);

      if (editResult && editResult.changedRows) {
        result.success = true;
      }

      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
};
