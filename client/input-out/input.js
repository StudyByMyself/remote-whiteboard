//设置默认编辑状态
Session.set("DocumentModifyStatus",false);

Template.input.events({
	"keyup textarea":function(e,t){
        InputsDao.update(e.currentTarget.value);
	},
	"keydown textarea":function(e,t){
		var keyCode = e.keyCode || e.which;
		var _this = e.currentTarget;
		if (keyCode == 9) {
			e.preventDefault();
			var start = $(_this).get(0).selectionStart;
			var end = $(_this).get(0).selectionEnd;
			$(_this).val($(_this).val().substring(0, start)
						+ "\t"
						+ $(_this).val().substring(end));
			$(_this).get(0).selectionStart =
			$(_this).get(0).selectionEnd = start + 1;
		}
	},
	"click button#save":function(event,template){
		var script = InputsDao.get();
		if(!script || script.replace(/(\ )+/g,"").length <  15){
			alert("The input text is too short!")
			return;
		}
        if(!Session.get('DocumentModifyStatus')){
            InputsStorageDao.create(script)
        }else{
            var _id = Session.get('input-script-id');
            if(!_id){
                return;
            }
            InputsStorageDao.update(_id,script);
        }
	},
    "click button#new":function(){
        InputsDao.set('');
        Session.set("DocumentModifyStatus",false);
    }
})
Template.input.script = function(){
	return Session.get('input-script')
}