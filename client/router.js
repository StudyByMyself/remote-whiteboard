/**
 * Created by ec on 14-6-17.
 */

Router.map(function(){
    this.route('index',{
        path:'/:id'
    });
})

IndexController = RouteController.extend({
    template:"Input-Output",
    layoutTemplate:"main-layout",
    data:function(){
        var params = this.params;
        console.log("params",params)
    }
})