const services = require("../services");

module.exports = {
  // 查询景点特色列表
  queryScenicList: async (req, res) => {
    try {
      let result = [];
      result = (await services.queryScenicList()) || [];
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  //查询景点类型
  queryTypeList: async (req, res) => {
    try {
      let result = [];
      result = (await services.queryTypeList()) || [];

      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  //新增景点类型
  createScenicType: async (req, res) => {
    try {
      let result = [];
      let { typeName } = req.query;
      console.log(typeName)
      result = (await services.createScenicType(typeName)) || [];
      res.send("新增成功");
    } catch (e) {
      res.send(e);
    }
  },
  //修改景点类型
  updataByScenicId: async (req, res) => {
    try {
      let { scenicId,typeName } = req.query;
      let result = '';
      result = (await services.updataByScenicId(scenicId, typeName)) || '';
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  //删除景点类型
  deleteScenicTpye: async (req, res) => {
    try {
      let { scenicId  } = req.query;
      console.log(scenicId)
      let result = '删除成功';
      result = (await services.deleteScenicTpye(scenicId)) || '';
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },

  /*---------------景点分类---------------*/

  //查询景点分类
  queryClassifyList: async (req, res) => {
    try {
      let result = [];
      result = (await services.queryClassifyList()) || [];
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
//新增景点分类
createClassify: async (req, res) => {
  try {
    let result = [];
    let { title } = req.query;
    result = (await services.createClassify(title)) || [];
    res.send("新增成功");
  } catch (e) {
    res.send(e);
  }
},
//修改景点分类
updataByclassifyId: async (req, res) => {
  try {
    let { classifyId,title } = req.query;
    let result = '';
    result = (await services.updataByclassifyId(classifyId, title)) || '';
    res.send(result);
  } catch (e) {
    res.send(e);
  }
},
  //删除景点分类
  deleteClassify: async (req, res) => {
    try {
      let {
        classifyId
      } = req.query;
      let result = '删除成功';
      result = (await services.deleteClassify(classifyId)) || '';
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }
};