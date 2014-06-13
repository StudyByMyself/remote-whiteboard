Meteor.subscribe("inputs",function(){
	var input = Inputs.findOne();
	var script =  input=== void(0)? '':input.script;
	Session.set('input-script',script);
});
Meteor.subscribe("inputs_storage",function(){});