$.ajaxSetup cache: true

AjaxLoadFile = () ->

AjaxLoadFile.load = (urls,cb) ->
  startTime = new Date().getTime()
  urls = [urls] if _.isString urls
  result = []
  urls = urls or []
  async.whilst ()->
      urls.length > 0
    ,(next)->
      url = urls.shift()
      $.getScript(url,(script, textStatus, jqXHR) ->
        result.push textStatus
        next()
      )
    ,(e,r) ->
        console.log "js file load time: ",(new Date().getTime() - startTime),"ms"
        cb and cb()

@AjaxLoadFile = AjaxLoadFile