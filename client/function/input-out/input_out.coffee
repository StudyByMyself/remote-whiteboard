editor = null
boarder = null

initAce = (mode, theme) ->
  mode = mode or "java"
  theme = theme or "twilight"
  editor = new Editor id: "editor", src: "/ace/src/"
  boader = new Editor id: "boarder", src: "/ace/src/"
  editor.init '', theme, mode
  boader.init '', theme, mode

Template.Input_Output.rendered = () ->
  console.log @.data
  initAce(@.data.type)