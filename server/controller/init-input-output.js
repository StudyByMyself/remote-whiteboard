//初始化输入输出页面的基本数据
InitInputAndOutput = function(){}

var redirtorURL = "http://www.baidu.com";

//权限校验
//var checkRights = function(){
//
//}

//防止恶意刷新
var isNormalVisit = function(ip){
    if(ip == "127.0.0.1"){
        return true;
    }
    //获取最近5条于该IP相关的记录
    var inputs = Inputs.find({ip:ip},{sort:{time:-1},limit:5});
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
//    Inputs.insert({webId:webId,ip:ip,time:new Date().getTime()})
//    InputsStorage.insert({webId:webId,ip:ip,time:new Date().getTime()});
    return webId;
}


InitInputAndOutput.do = function(request,response){
    var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    if(!isNormalVisit(ip)){
        response.writeHead(302, { "Location":redirtorURL});
        response.end();
    }else{
        var webId = generateNewRecord(ip);
        response.writeHead(302, { "Location":"/"+webId});
    }
}