UI.registerHelper "hightlight" (script,type) ->
    type = type or "java"
    script = script or ""
    Prism.highlightExtra "\n#{script}", Prism.languages[type]