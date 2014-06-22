###
  Created by ec on 14-6-21.
###

Inputs.allow
	insert : (userId, doc) ->
		# the user must be logged in, and the document must be owned by the user
		false
	update : (userId, doc, fields, modifier) ->
		# can only change your own documents
		true
	remove : (userId, doc) ->
		#can only remove your own documents
		false

# SubInputs doc 校验

SubInputsModule =
	title: _.isString
	script: _.isString
	timestamp: _.isNumber
	update_timestamp: _.isNumber
	webId:_.isString

insertVerity = (doc,module) ->



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
	insert:(userId, doc) ->
		content_length = doc.script.length
		if not userId and content_length > GlobalConfigure.get "scripts.subscript.unsignal.content-max-length"
			return true
		if userId and content_length > GlobalConfigure.get "scripts.subscript.signal.content-max-length"
			return true
		if doc.title  and doc.title.length > GlobalConfigure.get "scripts.subscript.title-length"
			return true
		false