/**
 * Created by ec on 14-6-13.
 */
InputsDao = function(){};

InputsDao.update = function(_id,script,callback){
//    if(!Inputs.findOne()) return;
//    var _id = Inputs.findOne()._id;
//    Inputs.update(_id,{$set:{script:script}});
      if(!Inputs.findOne(_id)){
          callback && callback(MessageBuild.build({type:"collection_empty"}));
          return;
      }
      Inputs.update(_id,{$set:{script:script}},function(){
          callback && callback();
      });
}

InputsDao.insertSubScript = function(_id,script,callback){
    if(!Inputs.findOne(_id)){
        callback && callback(MessageBuild.build({type:"collection_empty"}));
        return;
    }
    var item = {
        script:script,
        time:new Date().getTime(),
        _id:Random.id(10)
    }
    console.log(item)
    Inputs.update(_id,{$push:{subScripts:item}},function(){
        callback && callback();
    })
}