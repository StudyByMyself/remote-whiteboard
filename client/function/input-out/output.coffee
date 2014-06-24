Template.output.codeToLight = (string,type) ->
  type = type or 'java'
  hljs.highlight(type,"\n"+string).value

Template.output.events
  "click #edit": (e,template) ->
    parent_id = template.data._id
    _this = @
    Inputs.update parent_id,
      $set:
        script: _this.script,
        subscript_id: _this._id

  "click #delete": () ->
    _this = @
    InputsDao.removeSubScript [_this._id]

  "click #export": () ->
    _this = @
    InputsDao.export [_this._id]

Template.output.subScripts = () ->
  SubInputs.find({}).fetch()
