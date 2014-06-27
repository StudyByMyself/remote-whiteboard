Template.input.events
  "keyup textarea": (e,t) ->
    InputsDao.update @._id, e.currentTarget.value

  "keydown textarea": (e,t) ->
    keyCode = e.keyCode or e.which
    _this = e.currentTarget
    return if keyCode isnt 9
    e.preventDefault()

    start = $(_this).get(0).selectionStart
    end = $(_this).get(0).selectionEnd;
    $(_this).val($(_this).val().substring(0, start)
          + "\t"
          + $(_this).val().substring(end))
    $(_this).get(0).selectionEnd = start + 1


  "click button#save": (event,template) ->
    current = Router.current()
    web_id = current.params.id
#    if(!this.script || this.script.length === 0){
#        return;
#    }
    return if not @script? or (not @script.length)

    title = template.find("#title").value
    subscript_id = @subscript_id
    script = template.find("#input-area").value

    if SubInputs.findOne subscript_id
        InputsDao.updateSubScript subscript_id,script,title
    else
        InputsDao.insertSubScript web_id,script,title

  "click button#new": () ->
      InputsDao.new this._id

  "click button#sync": (e,t) ->
      t.find("#input-area").value = this.script

  "click button#saveas": (e,t) ->
    script = t.find("#input-area").value
    title = t.find("#title").value
    current = Router.current()
    web_id = current.params.id
    InputsDao.insertSubScript web_id,script,title if web_id

Template.input.getTitle = (subid) ->
    sub = SubInputs.findOne subid
    sub and sub.title ? ""