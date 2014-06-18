Router.map(function(){
	this.route('home',{
		path:'/',
		where:'server'
	});
})

HomeController =  RouteController.extend({
	action:function(){
        InitInputAndOutput.do(this.request,this.response);
	}
})
