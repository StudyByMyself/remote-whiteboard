Meteor.publish("inputs", function (webId) {
	return Inputs.find({webId:webId});
});

Meteor.publish('sub_inputs',function(webId){
    return SubInputs.find({webId:webId},{sort:{update_timestamp:-1}})
})