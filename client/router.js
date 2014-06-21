/**
 * Created by ec on 14-6-17.
 */
//定义模板未找到时的渲染的页面
Router.configure({
    notFoundTemplate: 'notfound' // this will render
});
//当路由data返回数据为空时,回到404
Router.onBeforeAction('dataNotFound');

Router.map(function(){
    this.route('index',{
        path:'/scripts/:id'
    });
})

IndexController = RouteController.extend({
    template:"Input-Output",
    layoutTemplate:"main-layout",
    waitOn: function () {
        return [Meteor.subscribe('inputs',this.params.id),Meteor.subscribe('sub_inputs',this.params.id)];
    },
    data:function(){
        return Inputs.findOne({webId:this.params.id});
    }
})