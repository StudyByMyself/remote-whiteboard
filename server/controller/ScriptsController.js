//初始化输入输出页面的基本数据
//防止恶意刷新
var isNormalVisit = function(ip){
    if(ip == "127.0.0.1"){
        return true;
    }
    //获取最近5条于该IP相关的记录
    var inputs = Inputs.find({ip:ip},{sort:{time:-1},limit:5}).fetch();
    if(inputs.length < 5 ){
        return true;
    }
    var now = new Date().getTime();
    var input = inputs[4];
    //如果最后一条记录的时间与现在时间大于60秒.即1分钟内产生的数据小于5条
    if(now - input.time > 60*1000){
        return true;
    }
    return false;

}

//生成记录
var generateNewRecord = function(ip){
    var webId = Random.id();
    Inputs.insert({webId:webId,ip:ip,time:new Date().getTime(),script:"",subScripts:[],type:"java"},function(error,_id){
        console.log("insert",_id);
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