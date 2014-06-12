Meteor.publish("inputs", function (fieldsObj) {
	return Inputs.find();
});