Template.output.codeToLight = function(string,type){
    type = type || 'java';
    return hljs.highlight(type,"\n"+string).value
}

Template.output.codes = function(){
    return null;
}

Template.output.events({
    "click #edit":function(){
        Session.set("DocumentModifyStatus",true);
        Session.set('input-script-id',this._id);
        InputsDao.set(this.script);
    },
    "click #delete":function(){
        if(this._id === Session.get('input-script-id')){
            Session.set("DocumentModifyStatus",false);
            InputsDao.set('');
        }
    }
})