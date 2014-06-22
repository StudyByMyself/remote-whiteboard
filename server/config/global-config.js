/**
 * Created by ec on 14-6-21.
 * 服务端全局配置配置
 */
var map = {
    "scripts":{
        "ip-visit-limit-time":5,//每个IP每分钟访问限制.不能为0
        "ip-visit-limit-time-unit":60*1000,////每个IP单位时间访问限制.默认为60s，和上面的组合使用
        "ip-visit-limit-max":1000,//每个IP生成记录总数限制，超过总记录则删除最旧一条记录。
        "subscript":{
            "unsignal":{//未登陆用户限制
                "count":9, //限制为10条
                "content-max-length":1500 //每个文件的最长记录
            },
            "signal":{ //已登陆用户限制子元素为50条
                "count":50, //限制子元素为50条
                "content-max-length":3000 //每个文件的最长记录
            }
        }
    }
}

GlobalConfigure = function(){};

//获取配置时以 . 分开。如："scripts.subscript.unsignal"
GlobalConfigure.get = function(config){
    var arr = config.split("\.");
    var con = _.clone(map);
    for(var i = 0; i < arr.length; i++){
        con = con[arr[i]]
    }
    return con
}