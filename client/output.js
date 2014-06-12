Template.output.output = function(){
	var script = Inputs.findOne() === void(0)? '':Inputs.findOne().script;
	return hljs.highlight('java',"\n"+script).value
}