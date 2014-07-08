
Template.language_model.events
  "change select#chooseTheme":(e,t) ->
    theme = e.currentTarget.value
    Session.set "_editor_theme", theme if Session.get "_editor_theme" isnt theme

  "change select#chooseMode":(e,t) ->
    mode = e.currentTarget.value
    Session.set "_editor_mode", mode if Session.get "_editor_mode" isnt mode

Template.language_model.themes = () ->
  [
    "ambiance","chaos","chrome","cloud9_day","cloud9_night",
    "cloud9_night_now","clouds","clouds_midnight","cobalt",
    "crimson_editor","dawn","dreamweaver","eclipse","github",
    "idle_fingers","katzenmilch","kr","kuroir","merbivore",
    "merbivore_soft","mono_industrial","monokai","pastel_on_dark",
    "solarized_dark","solarized_light","terminal","textmate","tomorrow",
    "twilight","xcode"
  ]
###
  "perl","r","sh","html_ruby","jack","jade","dart",
    "django","ejs","haskell","haxe","json","jsp","less","lisp",
    "lua","makefile","mysql",
###
Template.language_model.modes =() ->
  [
    "javascript","java","c_cpp","php","python","ruby","golang",
    "coffee","css","html","objectivec","sql"
  ]