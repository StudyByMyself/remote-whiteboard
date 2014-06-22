map =
	"default":
		"DELETE":"remove"
		"PUT":"update"
		"POST":"insert"
		"GET":"find"
	"InputsRemote":
		"DELETE":"removeSubScriptGroups"
route = () ->
###
 RESTful 设计
  访问的biz 不在配置中时，获取default默认的方法映射
  如果访问的biz在配置中，则获取对应的方法映射，如果方法映射没配置，则获取default的方法映射
###
route.get = (biz,method) ->
	if not map[biz]
		return map.default[method]
	map[biz][method] ? map.default[method]

@Route = route
