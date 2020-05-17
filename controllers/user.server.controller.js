const user = require("../services/user");

module.exports = {
  getUserlist: function(req, res, next) {
    try {
      const userList = [{ name: "zhang" }];
      return res.send(userList);
    } catch (e) {
      return res.send(e);
    }
  },
  // 用户登录
  userLogin: async function(req, res, next) {
    try {
      let isLegal = false;
      let { userName, userPassword } = req.query;
      let result = await user.verifyUserLogin({ userName });
      // TODO:
      console.log("result:", result[0]);
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
          phone
        }
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
      result.forEach((el,index)=>{
        if(el.isdelete==1){
          result.splice(index,1)
        }
      });
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  //删除用户
  deleteUser:async (req,res)=>{
    try{
      let { id } = req.query;
      let result='删除成功';
      result=(await user.delUser({id})) || '';
      res.send(result);
    }catch(e){
      res.send(e);
    }
  }
};
