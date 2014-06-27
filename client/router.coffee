###
定义模板未找到时的渲染的页面
###

Router.configure
  notFoundTemplate: 'notfound' # this will render

#当路由data返回数据为空时,回到404
Router.onBeforeAction 'dataNotFound'

Router.map () ->
  @route 'scripts',
    path: '/scripts/:id'
  @route 'preview',
    path: 'preview/:id'
  @route 'index',
    path: '/'

ScriptsController = RouteController.extend
  template:"Input-Output"
  layoutTemplate:"main-layout"
  waitOn: () ->
    [Meteor.subscribe('inputs',this.params.id),Meteor.subscribe('sub_inputs',this.params.id)]
  data: () ->
    Inputs.findOne({webId:this.params.id})

IndexController = RouteController.extend
  template: 'index'
  layoutTemplate:"main-layout"
  data: ()->
    true

PreviewController = RouteController.extend
  template:'preview'
  layoutTemplate:'main-layout'
  waitOn: ()->
  data: ()->
    id = @params.id
    input = SubInputs.findOne id if id

@ScriptsController = ScriptsController
@IndexController = IndexController
@PreviewController = PreviewController