Template.output.codeToLight = (string,type) ->
	type = type or 'java'
	hljs.highlight(type,"\n"+string).value


Template.output.events
	"click #edit": () ->
	"click #delete": () ->
		console.log this._id
		InputsDao.removeSubScript([this._id])

Template.output.subScripts = () ->
	SubInputs.find().fetch()
