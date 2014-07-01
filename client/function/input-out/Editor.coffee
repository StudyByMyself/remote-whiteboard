class Editor
  constructor: (options) ->
    {@id,@src} = options
    @_ = ace.edit @id
  init: (script,theme,mode)->
    @.setTheme theme
    @.setMode mode
    @.set script if script
  setTheme: (theme) ->
    _ = @_
    src = @src
    $.getScript("#{src}theme-#{theme}.js")
    .done(() ->
      _.setTheme "ace/theme/#{theme}"
    )
    .fail(()->
      alert '获取皮肤失败'
    )
  setMode: (mode) ->
    _ = @_
    src = @src
    $.getScript("#{src}mode-#{mode}.js")
    .done(() ->
      Mode = require("ace/mode/#{mode}").Mode
      _.getSession().setMode(new Mode)
    ).fail(()->
      alert '加载语言失败'
    )
  get: () ->
    @_.getValue()
  set: (script) ->
    @_.setValue script

@Editor = Editor