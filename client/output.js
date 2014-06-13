Template.output.output = function(){
	return hljs.highlight('java',"\n"+InputsDao.get()).value
}

Template.output.codes = function(){
    return InputsStorage.find({}).fetch();
}

Template.output.events({
    "click #edit":function(){
        Session.set("DocumentModifyStatus",true);
        Session.set('input-script-id',this._id);
        InputsDao.set(this.script);
    },
    "click #delete":function(){
        InputsStorageDao.delete(this._id);
        if(this._id === Session.get('input-script-id')){
            Session.set("DocumentModifyStatus",false);
            InputsDao.set('');
        }
    }
})