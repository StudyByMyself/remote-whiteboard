Template.input.events({
	"keyup textarea":function(e,t){
        InputsDao.update(this._id,e.currentTarget.value);
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
			//$(_this).get(0).selectionStart =
			$(_this).get(0).selectionEnd = start + 1;
		}
	},
	"click button#save":function(event,template){
        var current = Router.current();
        var web_id = current.params.id;
        if(!this.script || this.script.length === 0){
            return;
        }
        var title = template.find("#title").value;
        var subscript_id = this.subscript_id;
        if(SubInputs.findOne(subscript_id)){
            InputsDao.updateSubScript(subscript_id,this.script,title);
        }else{
            InputsDao.insertSubScript(web_id,this.script,title);
        }

	},
    "click button#new":function(){
        InputsDao.new(this._id)
    }
})

Template.input.getTitle = function(subid){
    var sub = SubInputs.findOne(subid);
    if(!sub){
        return ''
    }
    return sub.title;
}