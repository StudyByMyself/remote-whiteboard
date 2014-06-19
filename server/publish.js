Meteor.publish("inputs", function (webId) {
	return Inputs.find({webId:webId});
});