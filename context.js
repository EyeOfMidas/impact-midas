ig.module(
    'plugins.midas.imageloader'
)
.requires(
)
.defines(function(){
var ContextWrapper = function() {
	var context;
	this.init = function() {
		
	};
	this.attach = function(inContext) {
		context = inContext;
	};
};
});