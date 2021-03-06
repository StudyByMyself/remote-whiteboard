###
定义模板未找到时的渲染的页面
###
$.ajaxSetup cache: true

Router.configure
  notFoundTemplate: 'notfound' # this will render

#当路由data返回数据为空时,回到404
Router.onBeforeAction 'dataNotFound'
Router.onBeforeAction 'loading'

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
  action: () ->
    _this = @
    if(_this.ready())
      _this.render()
    else
      this.render('loading');
  data: () ->
    Inputs.findOne({webId:this.params.id})

IndexController = RouteController.extend
  template: 'index'
  layoutTemplate:"simple-layout"
  data: ()->
    true

PreviewController = RouteController.extend
  template:'preview'
  layoutTemplate:'main-layout'
  waitOn: ()->
  data: ()->
    id = @params.id
    SubInputs.findOne id if id

@ScriptsController = ScriptsController
@IndexController = IndexController
@PreviewController = PreviewController