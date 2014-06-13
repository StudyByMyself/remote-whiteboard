Meteor.publish("inputs", function (fieldsObj) {
	return Inputs.find();
});

Meteor.publish("inputs_storage", function (fieldsObj) {
	return InputsStorage.find();
});