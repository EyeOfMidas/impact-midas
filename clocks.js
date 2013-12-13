ig.module(
	'plugins.midas.clocks'
)
.requires(
	'impact.impact'
)
.defines(function() {
TrueClock = ig.Class.extend({
	getMilliseconds: function() {
		var date = new Date();
		return date;
	}
});
TrueStopwatch = ig.Class.extend({
	clock: new TrueClock(),
	base: 0,
	target: 0,
	running: false,
	init: function() {
		var milliseconds = this.clock.getMilliseconds();
		this.base = milliseconds;
		this.target = milliseconds;
	},
	start: function() {
		if(!this.running) {
			this.base = this.clock.getMilliseconds();
			this.running = true;			
		}
	},
	get: function() {
		if(this.running) {
			return this.clock.getMilliseconds() - this.base;
		}
		return this.target - this.base;
	},
	stop: function() {
		if(this.running) {
			this.target = this.clock.getMilliseconds();
			this.running = false;
		}
	}
});

TrueTimer = ig.Class.extend({
	clock: new TrueClock(),
	base: 0,
	target: 0,
	running: false,
	init: function() {
		var milliseconds = this.clock.getMilliseconds();
		this.base = milliseconds;
		this.target = milliseconds;
	},
	start: function(milliseconds) {
		if(!this.running) {
			this.base = this.clock.getMilliseconds();
			this.target = this.base + milliseconds;
			this.running = true;
		}
	},
	get: function() {
		var remaining = this.target - this.clock.getMilliseconds();
		if(this.running){
			if(remaining <= 0) {
				this.running = false;
				remaining = 0;
			}
		} else {
			remaining = this.target - this.base;
		}
		return remaining;
	},
	stop: function() {
		if(this.running) {
			this.base = this.clock.getMilliseconds();
			this.running = false;
		}
	}
});
});
