Template.output.codeToLight = function(string,type){
    type = type || 'java';
    return hljs.highlight(type,"\n"+string).value
}

Template.output.codes = function(){
    return null;
}

Template.output.events({
    "click #edit":function(){
    },
    "click #delete":function(){
    }
})

Template.output.subScripts = function(){
    return SubInputs.find().fetch();
}