ig.module(
	'plugins.midas.masonry'
)
.requires(
	'impact.impact'
)
.defines(function() {
PluginMasonry = function(){
	var pos = {x:0, y:0},
	size = {x:100, y:100};
	this.init = function(x, y, width, heigth) {
		pos.x = x;
		pos.y = y;
		size.x = width;
		size.y = height;
	},
	this.build = function() {
		//TODO: take in array of images
		//look at width of all images
		//look at height of images
		//fit images within masonry size
	};
};
});
