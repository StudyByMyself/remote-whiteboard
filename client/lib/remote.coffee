###
#Created by ec on 14-6-24.
#包装Meteor.call方法
###

Remote = () ->

Remote.call = (remote,args,callback) ->
	remoteClass = remote.split(".")[0]
	remoteMethod = remote.split(".")[1]
	_args = if _.isArray(args) then args else [args]
	callback = callback ? ()->
	Meteor.call remoteClass,
		method: remoteMethod
		args: _args
		,(err,result) ->
			if err
				console.log  "服务器内部错误"
				callback
					status:false
					msg:"服务器内部错误"
			else
				callback
					status:true
					result:result

@Remote = Remote