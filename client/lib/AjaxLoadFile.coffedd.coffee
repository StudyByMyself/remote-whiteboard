AjaxLoadFile = () ->

AjaxLoadFile.load = (urls,cb) ->
  startTime = new Date().getTime()
  result = []
  urls = urls or []
  async.whilst ()->
      urls.length > 0
    ,(next)->
      url = urls.shift()
      $.getScript(url)
        .done((e,t,r) ->
          result.push r
          next()
        )
        .fail(()->
          console.log 'fail load',url
          next()
        )
    ,(e,r) ->
        console.log "js file load time: ",(new Date().getTime() - startTime),"ms"
        console.log r
        cb and cb()

@AjaxLoadFile = AjaxLoadFile