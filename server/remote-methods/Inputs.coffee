InputsRemote = () ->

# 移除一组子条目
InputsRemote.removeSubScriptGroups = (subIds) ->
	SubInputs.remove
		_id:
			$in:subIds

# 测试
InputsRemote.find = () ->
	arguments

InputsRemote.update = () ->
	arguments

InputsRemote.insert = () ->
	arguments

@InputsRemote = InputsRemote