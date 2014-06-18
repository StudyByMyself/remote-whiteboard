//保存当前输入状态
Inputs = new Meteor.Collection('inputs');

//代码存档
InputsStorage = new Meteor.Collection('inputs_storage');

Inputs.allow({
	insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
		return false;
	},
	update: function (userId, doc, fields, modifier) {
    // can only change your own documents
		return true;
	},
	remove: function (userId, doc) {
    // can only remove your own documents
		return false;
	}
});

InputsStorage.allow({
	insert: function (userId, doc) {
		return true;
	},
	update: function (userId, doc, fields, modifier) {
		return true;
	},
	remove: function (userId, doc) {
    // can only remove your own documents
		return true;
	}
});