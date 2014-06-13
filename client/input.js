Template.input.events({
	"keyup textarea":function(e,t){
		if(!Inputs.findOne()) return;
		var script = e.currentTarget.value;
		var _id = Inputs.findOne()._id;
		Session.set('input-script',script);
		Inputs.update(_id,{$set:{script:script}});
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
		var script = Session.get('input-script');
		if(!script || script.replace(/(\ )+/g,"").length <  15){
			alert("The input text is too short!")
			return;
		}
		InputsStrorage.insert({script:script,time:new Date().getTime()})
	}
})
Template.input.script = function(){
	return Session.get('input-script')
}