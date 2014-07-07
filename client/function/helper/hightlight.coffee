scriptMap =
  "c":"c"
  "c_cpp": "cpp",
  "coffee": "coffeescript",
  "css": "css",
  "golang": "go",
  "html": "markup",
  "java": "java",
  "javascript": "javascript",
  "objectivec": "objectivec",
  "php": "php",
  "python": "python",
  "ruby": "ruby",
  "sql": "sql"

UI.registerHelper "hightlight", (script,type) ->
    type = scriptMap[type] or "java"
    script = script or ""
    Prism.highlightExtra "\n#{script}", Prism.languages[type]