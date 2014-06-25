###
  Created by ec on 14-6-21.
###
insertVerity = (doc,module) ->
  for property of doc
    if not ( property of module )
      return false
    else
      if not module[property] doc[property]
        return false
  true

InpustModule =
  title: (title) ->
    if not _.isString title
      return false
    if title.length > GlobalConfigure.get "scripts.subscript.signaltitle-length"
      return false
    true
  script: (script) ->
    if not _.isString script
      return false
    if script.length > GlobalConfigure.get "scripts.subscript.signal.content-max-length"
      return false
    true
  subscript_id: (subscript_id) ->
    if not _.isString subscript_id
      return false
    if subscript_id.length > 36
      return false
    true

Inputs.allow
  update : (userId, doc, fields, modifier) ->
    # can only change your own documents
    true

Inputs.deny
  insert: (userId, doc) ->
    true
  update: (userId, doc, fields, modifier) ->
    _modifier =
      "$set":modifier["$set"]
    modifier = _modifier
    not insertVerity modifier["$set"],InpustModule
  remove : (userId, doc) ->
    true


SubInputsModule =
  title: (title) ->
    if not _.isString title
      return false
    if title.length > GlobalConfigure.get "scripts.subscript.signaltitle-length"
      return false
    true
  script: (script) ->
    if not _.isString script
      return false
    if script.length > GlobalConfigure.get "scripts.subscript.signal.content-max-length"
      return false
    true
  timestamp: (timestamp)->
    if not _.isNumber timestamp
      return false
    if timestamp.toString().length > 13
      return false
    true
  update_timestamp: (timestamp)->
    if not _.isNumber timestamp
      return false
    if timestamp.toString().length > 13
      return false
    true
  webId: (webId) ->
    if not _.isString
      return false
    if webId.length > 36
      return false
    true

SubInputs.allow
	insert : (userId, doc) ->
		#the user must be logged in, and the document must be owned by the user
		webId = doc.webId
		subscripts = SubInputs.find(
			{webId:webId},
			sort:
				timestamp:1
		).fetch()
		#未登录用户，每个网页只允许n条子记录,超过删除最旧
		if not userId and (limit = GlobalConfigure.get "scripts.subscript.unsignal.count") and subscripts.length > limit
			# 需逻辑修正
			SubInputs.remove subscripts[0]._id
		#未登录用户，每个网页只允许n条子记录
		if userId and subscripts.length > GlobalConfigure.get "scripts.subscript.signal.count"
			SubInputs.remove subscripts[0]._id
		true
	update : (userId, doc, fields, modifier) ->
		#can only change your own documents
		true
	remove : (userId, doc) ->
		#can only remove your own documents
		true

SubInputs.deny
  insert: (userId, doc) ->
    not insertVerity doc,SubInputsModule
  update: (userId, doc, fields, modifier) ->
    _modifier =
      "$set": modifier["$set"]
    modifier = _modifier
    not insertVerity modifier["$set"],SubInputsModule
  remove: (userId, doc) ->
    false


