Template.output.output = function(){
	var script = Inputs.findOne().script;
	return hljs.highlight('java',"\n"+script).value
}