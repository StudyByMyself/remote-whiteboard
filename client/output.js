Template.output.output = function(){
	return hljs.highlight('java',"\n"+Session.get('input-script')).value
}