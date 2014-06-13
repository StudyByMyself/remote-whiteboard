/**
 * Created by ec on 14-6-13.
 */
InputsStorageDao = function(){}

InputsStorageDao.create = function(script){
    InputsStorage.insert({script:script,time:new Date().getTime()})
}

InputsStorageDao.update = function(_id,script){
    InputsStorage.update(_id,{$set:{script:script,time:new Date().getTime()}});
}

InputsStorageDao.delete = function(_id){
    InputsStorage.remove(_id);
}