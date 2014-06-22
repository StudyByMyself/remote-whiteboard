//初始化输入输出页面的基本数据
//防止恶意刷新
var isNormalVisit = function(ip){
    if(ip == "127.0.0.1"){
        return true;
    }
    var limit = GlobalConfigure.get("scripts.ip-visit-limit-time");
    var limit_unit =  GlobalConfigure.get("ip-visit-limit-time-unit");
    //获取最近limit条于该IP相关的记录
    var inputs = Inputs.find({ip:ip},{sort:{timestamp:-1},limit:limit}).fetch();
    if(inputs.length < limit ){
        return true;
    }
    var now = new Date().getTime();
    var input = inputs[limit-1];
    //如果最后一条记录的时间与现在时间大于limit_unit毫秒.即limit_unit毫秒内产生的数据小于limit条
    if(now - input.time > limit_unit){
        return true;
    }
    return false;

}

//生成记录
var generateNewRecord = function(ip){
    var webId = Random.id();
    Inputs.insert({
        webId:webId,
        ip:ip,
        timestamp:new Date().getTime(),
        script:"",type:"java"
    },function(error,_id){
    })
    return webId;
}


var createWebId = function(ip){
    if(!isNormalVisit(ip)){
        return false;
    }else{
        return generateNewRecord(ip);
    }
}


ScriptsController =  RouteController.extend({
    action:function(){
        var ip = this.request.headers['x-forwarded-for'] || this.request.connection.remoteAddress;
        var webId = createWebId(ip);
        if(!webId){
            var redirtorURL = "http://www.baidu.com";
            this.response.writeHead(302, { "Location":redirtorURL});
            this.response.end();
        }else{
            this.response.writeHead(302, { "Location":"/scripts/"+webId});
        }
    }
})