Editor = {}

Editor.init = ()->
  editor = ace.edit "editor"
  Editor._ = editor
  Editor.setTheme "twilight"
  Editor.setMode "javascript"

Editor.setTheme = (theme) ->
  $.getScript("/ace/src/theme-#{theme}.js")
    .done(() ->
      Editor._.setTheme "ace/theme/#{theme}"
    )
    .fail(()->
      alert '获取皮肤失败'
    )

Editor.setMode = (mode) ->
  $.getScript("/ace/src/mode-#{mode}.js")
    .done(() ->
      Mode = require("ace/mode/#{mode}").Mode
      Editor._.getSession().setMode(new Mode)
    ).fail(()->
      alert '加载语言失败'
    )

Template.input.events
  "keyup textarea": (e,t) ->
    #InputsDao.update @._id, e.currentTarget.value

  "click button#save": (event,template) ->
    current = Router.current()
    web_id = current.params.id
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

  "click button#saveAs": (e,t) ->
    script = t.find("#input-area").value
    title = t.find("#title").value
    current = Router.current()
    web_id = current.params.id
    InputsDao.insertSubScript web_id,script,title if web_id

  "change select#chooseTheme":(e,t) ->
    Editor.setTheme(e.currentTarget.value)

  "change select#chooseMode":(e,t) ->
    Editor.setMode(e.currentTarget.value)

Template.input.getTitle = (subid) ->
    sub = SubInputs.findOne subid
    sub and sub.title ? ""

Template.input.rendered = () ->
  Editor.init()
  $.ajaxSetup cache: true

Template.input.themes = () ->
  [
    "ambiance","chaos","chrome","cloud9_day","cloud9_night",
    "cloud9_night_now","clouds","clouds_midnight","cobalt",
    "crimson_editor","dawn","dreamweaver","eclipse","github",
    "idle_fingers","katzenmilch","kr","kuroir","merbivore",
    "merbivore_soft","mono_industrial","monokai","pastel_on_dark",
    "solarized_dark","solarized_light","terminal","textmate","tomorrow",
    "twilight","xcode"
  ]

Template.input.modes =() ->
  [
    "javascript","java","c_cpp","perl","php","python","r","ruby","sh",
    "coffee","css","html","html_ruby","jack","jade","dart",
    "django","ejs","golang","haskell","haxe","json","jsp","less","lisp",
    "lua","makefile","mysql","objectivec","sql"
  ]