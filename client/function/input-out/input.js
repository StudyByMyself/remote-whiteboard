Template.input.events({
	"keyup textarea":function(e,t){
        InputsDao.update(this._id,e.currentTarget.value,function(){
            Prism.highlightAll()
        });

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
      var script = template.find("#input-area").value;
      if(SubInputs.findOne(subscript_id)){
          InputsDao.updateSubScript(subscript_id,script,title);
      }else{
          InputsDao.insertSubScript(web_id,script,title);
      }
	},
    "click button#new": function(){
        InputsDao.new(this._id)
    },
    "click button#sync": function(e,t){
        t.find("#input-area").value = this.script
    },
    "click button#saveas": function(e,t){
      var script = t.find("#input-area").value;
      var title = t.find("#title").value;
      var current = Router.current();
      var web_id = current.params.id;
      InputsDao.insertSubScript(web_id,script,title);
    }
})

Template.input.getTitle = function(subid){
    var sub = SubInputs.findOne(subid);
    if(!sub){
        return ''
    }
    return sub.title;
}