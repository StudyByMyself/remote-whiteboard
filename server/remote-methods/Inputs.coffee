InputsRemote = () ->

# 移除一组子条目
InputsRemote.removeSubScriptGroups = (subIds) ->
	console.log subIds
	SubInputs.remove
		_id:
			$in:subIds

# 测试
InputsRemote.find = () ->
	console.log arguments
	arguments

InputsRemote.update = () ->
	arguments

InputsRemote.insert = () ->
	arguments

@InputsRemote = InputsRemote