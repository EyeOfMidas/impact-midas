ig.module(
    'plugins.camera'
)
.requires(
    'impact.impact',

	'plugins.screenshake'
)
.defines(function(){
PluginCamera = ig.Class.extend({
	game: null,
	screenshake: null,

	pos: {x: 0, y:0},

	init: function(game) {
		this.game = game;
		this.screenshake = new PluginScreenShake(0.02, 8, 0.5);
	},
	update: function() {
		this.screenshake.update();
		var offset = this.screenshake.getCurrentOffset();
		this.game.screen.x = this.pos.x + offset.x;
		this.game.screen.y = this.pos.y + offset.y;
	},
	shake: function() {
		this.screenshake.start();
	}
});
});
