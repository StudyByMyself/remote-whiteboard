fs = Npm.require 'fs'

ScriptsExportController = RouteController.extend
  action: () ->
    ip = @request.headers['x-forwarded-for'] or @request.connection.remoteAddress
    id = @params.id
    console.log ip,id
    input = SubInputs.findOne id
    if not input
      @response.end "404 你找的文件不存在"
      return
    title = encodeURIComponent input.title
    @response.writeHead 200,
      'Content-Type': 'text/plain; charset=utf-8'
      'Content-Encoding': 'utf8'
      'Content-Disposition': "attachment; filename*=utf8''#{title}"

    @response.end input.script,"utf8"

@ScriptsExportController = ScriptsExportController