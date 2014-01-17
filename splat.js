ig.module(
    'plugins.midas.splat'
)
.requires(
    'impact.impact',
    'impact.entity',
    'impact.font',
    
    'plugins.tween'
)
.defines(function(){
PluginSplat = ig.Entity.extend({
	pos: {x:0, y:0},
	startPos: {x: 0, y:0},
	endPos: {x: 0, y: 0},
	startAlpha: 1,
	endAlpha: 0,
	text: "Splat",
	font: null,
	isVisible: false,
	fontAlign: ig.Font.ALIGN.CENTER,
	init: function(x, y, settings) {
		this.startPos.x = x;
		this.startPos.y = y;
		this.parent(x, y, settings);
		this.reset();
	},
	update: function() {
		this.parent();
	},
	draw: function() {
		this.parent();
		if(!this.isVisible) {
			return;
		}
		this.font.draw(this.text, this.pos.x, this.pos.y, ig.Font.ALIGN.CENTER);
	},
	reset: function() {
		this.pos.x = this.startPos.x;
		this.pos.y = this.startPos.y;
		this.font.alpha = this.startAlpha;
	},
	trigger: function() {
		this.reset();
		this.isVisible = true;
		var self = this;
		this.tween({pos:{x:this.endPos.x, y: this.endPos.y}}, 2, {}).start();
		this.tween({font:{alpha: this.endAlpha}}, 1, {onComplete:function(){
			self.isVisible = false;
		}}).start();
	}
});
});
