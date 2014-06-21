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


SubInputs.allow
	insert : (userId, doc) ->
		#the user must be logged in, and the document must be owned by the user
		webId = doc.webId
		content_length = doc.script.length
		if not userId and content_length > GlobalConfigure.get "scripts.subscript.unsignal.content-max-length"
			return false
		if userId and content_length > GlobalConfigure.get "scripts.subscript.signal.content-max-length"
			return false

		subscripts = SubInputs.find(
			{webId:webId},
			sort:
				timestamp:1
		).fetch()
		#未登录用户，每个网页只允许n条子记录,超过删除最旧
		if not userId and (limit = GlobalConfigure.get "scripts.subscript.unsignal.count") and subscripts.length > limit
			#SubInputs.remove({webId:webId})
			# 需逻辑修正
			SubInputs.remove subscripts[0]._id
		#未登录用户，每个网页只允许n条子记录
		if userId and length > GlobalConfigure.get "scripts.subscript.signal.count"
			#SubInputs.remove({webId:webId})
			SubInputs.remove subscripts[0]._id
		true
	update : (userId, doc, fields, modifier) ->
		#can only change your own documents
		true
	remove : (userId, doc) ->
		#can only remove your own documents
		true