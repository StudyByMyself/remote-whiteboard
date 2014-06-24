Router.map () ->
  @route 'scripts',
    path: '/scripts'
    where: 'server'
  @route 'scriptsExport',
    path: '/scripts/:id/export'
    where: 'server'
  false