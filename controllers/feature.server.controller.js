const services = require("../services");

module.exports = {
  // 查询景点星级列表
  queryFeatureList: async (req, res) => {
    try {
      let result = [];
      result = (await services.queryFeatureList()) || [];
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  //新增景点星级
createFeature: async (req, res) => {
  try {
    let result = [];
    let { featureName } = req.query;
    result = (await services.createFeature(featureName)) || [];
    res.send("新增成功");
  } catch (e) {
    res.send(e);
  }
},
//修改景点星级
updataByfeatureId: async (req, res) => {
  try {
    let { featureId,featureName } = req.query;
    let result = '';
    result = (await services.updataByfeatureId(featureId, featureName)) || '';
    res.send(result);
  } catch (e) {
    res.send(e);
  }
},
  //删除景点星级
  deleteFeature:async (req,res)=>{
    try{
      let { featureId } = req.query;
      let result='删除成功';
      result=(await services.deleteFeature(featureId)) || '';
      res.send(result);
    }catch(e){
      res.send(e);
    }
  }
};
