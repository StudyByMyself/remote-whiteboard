Template.header.rendered = () ->
  $('input#share-input').val(window.location.href)
  $('button#sharr-btn').zclip
    path:'/assets/ZeroClipboard.swf'
    copy:$('input#share-input').val(),
    afterCopy:() ->
      alert "已复制地址到粘贴板,赶快分享你Code给你小伙伴把!\n ^_^"

Template.header.events
  "submit form": (e) ->
    e.preventDefault();