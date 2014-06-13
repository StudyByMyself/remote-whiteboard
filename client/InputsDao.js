/**
 * Created by ec on 14-6-13.
 */
InputsDao = function(){};

InputsDao.update = function(script){
    if(!Inputs.findOne()) return;
    var _id = Inputs.findOne()._id;
    Inputs.update(_id,{$set:{script:script}});
}

InputsDao.get = function(){
    return Inputs.findOne() ? Inputs.findOne().script : '';
}

InputsDao.set = function(script){
    var _id = Inputs.findOne()._id;
    Inputs.update(_id,{$set:{script:script}});
}