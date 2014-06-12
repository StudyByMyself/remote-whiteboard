Meteor.startup(function(){
	if(Inputs.findOne()){
		return;
	}
	Inputs.insert({script:''})
})