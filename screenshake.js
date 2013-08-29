ig.module(
    'plugins.midas.screenshake'
)
.requires(
    'impact.impact',
    'impact.timer'
)
.defines(function(){
PluginScreenShake = ig.Class.extend({
    isStarted: false,
    period: 0,
    scale: 0,
    duration: 0,
    periodTimer: null,
    durationTimer: null,
	scaleFlux: 0,
    lastOffset: {x:0, y:0},
    nextOffset: {x:0, y:0},
    currentOffset: {x:0, y:0},
    init: function(period, scale, duration) {
		this.period = period;
        this.scale = scale;
        this.duration = duration;
		this.durationTimer = new ig.Timer();
		this.periodTimer = new ig.Timer();
    },
	newNextOffset: function() {
		this.nextOffset.x = Math.random() * this.scaleFlux;
		this.nextOffset.y = Math.random() * this.scaleFlux;
	},
    start: function() {
		this.durationTimer.set(this.duration);
		this.periodTimer.set(this.period);
		this.scaleFlux = this.scale;
		this.lastOffset = {x:0, y:0};
		this.newNextOffset();
        this.isStarted = true;
    },
    update: function() {
        if (!this.isStarted) {
            return;
        }

		var periodDelta = this.periodTimer.delta();
		var shakeDelta = this.durationTimer.delta();
		if (periodDelta < 0) {
			this.currentOffset.x = this.nextOffset.x + (this.lastOffset.x - this.nextOffset.x) * (-periodDelta / this.period);
			this.currentOffset.y = this.nextOffset.y + (this.lastOffset.y - this.nextOffset.y) * (-periodDelta / this.period);
		} else if (shakeDelta < 0) {
			this.lastOffset = this.currentOffset;
			this.newNextOffset();
			this.periodTimer.set(this.period);
		} else if (this.shakeFlux > 0.001) {
			this.shakeFlux *= 0.5;
			this.lastOffset = this.currentOffset;
			this.newNextOffset();
			this.periodTimer.set(this.period);
		} else {
			this.stop();
		}


    },
    stop: function() {
		this.lastOffset = {x:0, y:0};
		this.currentOffset = {x:0, y:0};
        this.isStarted = false;
    },
    getCurrentOffset: function() {
        return this.currentOffset;
    },
    updateScreen: function() {
		originalPos = ig.screen;
        ig.screen = this.getCurrentOffset();
    }
});
});
