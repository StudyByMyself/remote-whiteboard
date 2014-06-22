_require = (module) ->
	_module = global[module] #share Meteor中跨文件共享的变量
	throw new Error "module #{module} 不存在" if not _module
	_module

Agent = () ->

Agent.buildMsg = (status,msg,result) ->
	_msg =
		"403":"无权限"
		"404":"访问页面不存在"
		"500":"服务器内部错误"
	msg = msg ? _msg[status.toString()]
	status: status
	msg: msg
	result:result

Agent.get = (biz) ->
	remote = _require(biz)
	(data) ->
		method =  data.method ? "GET"
		args = data.args
		_fn = Route.get(biz,method) #获取函数映射
		fn = remote[_fn] if _fn
		console.log "route","访问 #{biz}的 #{_fn}"
		if not fn
			return Agent.buildMsg(404)
		right = Agent.hasRight(biz,_fn)
		if not right
			result = Agent.buildMsg(403)
		else
			result = fn.apply(remote,args)
		result

Agent.hasRight = (biz,method) ->
	#user = Meteor.user()
	# 做一些事情来进行 权限校验 已经拿到了biz ，method 和用户信息
	true

Meteor.methods
	"Inputs": Agent.get("InputsRemote")
