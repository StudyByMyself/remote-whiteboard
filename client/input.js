Template.input.events({
	"keyup textarea":function(e,t){
		if(!Inputs.findOne()) return;
		var _id = Inputs.findOne()._id;
		Inputs.update(_id,{$set:{script:e.currentTarget.value}})
	},
	"keydown textarea":function(e,t){
		var keyCode = e.keyCode || e.which;
		var _this = e.currentTarget;
		if (keyCode == 9) {
			e.preventDefault();
			var start = $(_this).get(0).selectionStart;
			var end = $(_this).get(0).selectionEnd;

			// set textarea value to: text before caret + tab + text after caret
			$(_this).val($(_this).val().substring(0, start)
						+ "\t"
						+ $(_this).val().substring(end));

			// put caret at right position again
			$(_this).get(0).selectionStart =
			$(_this).get(0).selectionEnd = start + 1;
		}
	}
})