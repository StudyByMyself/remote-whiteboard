$.ajaxSetup cache: true

AjaxLoadFile = () ->

AjaxLoadFile.load = (urls,cb) ->
  startTime = new Date().getTime()
  urls = [urls] if _.isString urls
  result = []
  urls = urls or []
  _download = []
  async.whilst ()->
      urls.length > 0
    ,(next)->
      url = urls.shift()
      $.getScript(url,(script, textStatus, jqXHR) ->
        result.push textStatus
        _download.push url
        next()
      )
    ,(e,r) ->
        console.log "js file #{_download} load time: ",(new Date().getTime() - startTime),"ms"
        cb and cb()

@AjaxLoadFile = AjaxLoadFile