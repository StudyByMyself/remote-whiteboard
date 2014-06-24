/**
 * Created by ec on 14-6-13.
 */
InputsDao = function(){};

InputsDao.update = function(_id,script,callback){
      if(!Inputs.findOne(_id)){
          callback && callback(MessageBuild.build({type:"collection_empty"}));
          return;
      }
      Inputs.update(_id,{$set:{script:script}},function(){
          callback && callback();
      });
}

InputsDao.insertSubScript = function(webId,script,title){
    var now = new Date().getTime();
    title = (title == null || (title = title.replace(/(^\s*)|(\s*$)/g, "")) === "")
            ? "未知标题"
            : title.substr(0,20)
    var item = {
        title:title,
        script:script,
        timestamp:now,
        update_timestamp:now,
        webId:webId
    }
    SubInputs.insert(item,function(e,r_id){
        var p_id = Inputs.findOne({webId:webId})._id;
        Inputs.update(p_id,{
            $set:{
                subscript_id:r_id
            }
        })
    })
}

InputsDao.updateSubScript = function(subId,script,title){
    title = (title == null || (title = title.replace(/(^\s*)|(\s*$)/g, "")) === "")
        ? "未知标题"
        : title.substr(0,20)
    SubInputs.update(subId,{
        $set:{
            script:script,
            title:title,
            update_timestamp:new Date().getTime()
        }
    })
}


InputsDao.removeSubScript = function(webIds,callback){
    callback = callback || function(){}
    Remote.call("Inputs.DELETE",[webIds],function(data){
      callback(data)
    })
}

InputsDao.new = function(_id){
    Inputs.update(_id,{
        $set:{
            script:"",
            title:"",
            subscript_id:""
        }
    },function(){});
}

InputsDao.export = function(_id){
  window.open("/scripts/"+_id+"/export",false)
}