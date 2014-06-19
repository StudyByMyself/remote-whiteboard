/**
 * Created by ec on 14-6-20.
 */
MessageBuild = function(){}

var getErrorDesc = function(type){
    var map = {
        "collection_empty":"数据不存在"
    }
    return map[type];
}

MessageBuild.build = function(msg){
    if(typeof msg === "string"){
        return {
            value:msg,//值
            desc:msg,//错误描述
            tips:msg //错误提醒
        }
    }
    if(typeof msg === "object"){
       var type = msg.type || "";
        return {
            value:"",
            desc:getErrorDesc(type),
            tips:""
        }
    }
}