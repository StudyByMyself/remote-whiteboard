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

InputsDao.insertSubScript = function(webId,script,callback){
    var item = {
        script:script,
        timestamp:new Date().getTime(),
        webId:webId
    }
    SubInputs.insert(item,function(){
        callback && callback();
    })
}

InputsDao.removeSubScript = function(webIds,callback){
    Meteor.call("Inputs",{
        method:"DELETE",
        args:[webIds]
    },function(error,result){

    })
}