const services = require("../services");

module.exports = {
  // 查询景点星级列表
  queryFeatureList: async (req, res) => {
    try {
      let result = [];
      result = (await services.queryFeatureList()) || [];
      result.forEach((el,index)=>{
        if(el.isDel==1){
          result.splice(index,1)
        }
      });
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
