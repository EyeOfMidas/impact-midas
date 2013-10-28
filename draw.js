ig.module(
	'plugins.midas.draw'
)
.requires(
	'impact.impact'
)
.defines(function() {
PluginDraw = function(){
    var strokeColor = "#000000",
    lineWidth = 1,
    fillColor = null,
    strokeDirty = false,
    fillDirty = false;

    this.setLineWidth = function(newLineWidth) {
    	lineWidth = newLineWidth;
    };

    this.setStroke = function(newStrokeColor) {
    	if(strokeColor != newStrokeColor) {
    		strokeDirty = true;
    	}
    	strokeColor = newStrokeColor;
    };

    this.setFill = function(newFillColor) {
    	if(fillColor != newFillColor) {
    		fillDirty = true;
    	}
    	fillColor = newFillColor;    		
    };

    this.rect = function(x, y, width, height) {
		var context = ig.system.context;
		var scale = ig.system.scale;
		var scaledOffsetRect = {
		    x: scale * x - scale * ig.game.screen.x,
		    y: scale * y - scale * ig.game.screen.y,
		    width: scale * width,
		    height: scale * height
	    };
        context.beginPath();
        context.rect(scaledOffsetRect.x, scaledOffsetRect.y, scaledOffsetRect.width, scaledOffsetRect.height);
        if (fillColor) {
        	if(fillDirty) {
        		context.fillStyle = fillColor;
        		fillDirty = false;
        	}
            context.fill();
        }
        
        if (strokeColor) {
        	if(strokeDirty) {
        		context.strokeStyle = strokeColor;
        		strokeDirty = false;
        	}
            context.lineWidth = lineWidth;
            context.stroke();
        }
		this.reset();
    };

    this.line = function(x1, y1, x2, y2) {
		var context = ig.system.context;
		var scale = ig.system.scale;
		var startingVector = {
			x: scale * x1 - scale * ig.game.screen.x,
			y: scale * y1 - scale * ig.game.screen.y
		    };
		var endingVector = {
			x: scale * x2 - scale * ig.game.screen.x,
			y: scale * y2 - scale * ig.game.screen.y
		    };
	    context.beginPath();
	    context.moveTo(startingVector.x, startingVector.y);
	    context.lineTo(endingVector.x, endingVector.y);
	
	    context.strokeStyle = strokeColor;
	    context.lineWidth = lineWidth;
	    context.stroke();
    };

    this.point = function(x, y) {
		this.line(x, y, x + 1, y + 1);
    };
	this.reset = function() {
		var context = ig.system.context;
		this.strokeColor = "#000000";
		this.lineWidth = 1;
		this.fillColor = null;
		context.strokeStyle = strokeColor;
		context.fillStyle = fillColor;
		context.lineWidth = lineWidth;
		
	};
	
	this.circle = function(centerX, centerY, radius) {
		var context = ig.system.context;
		var scale = ig.system.scale;
		context.beginPath();
		context.arc(centerX + ig.game.screen.x, centerY + ig.game.screen.y, scale * radius, 0, 2 * Math.PI, false);
		if (fillColor) {
			if(fillDirty) {
				context.fillStyle = fillColor;
				fillDirty = false;
			}
            context.fill();
        }
        
        if (strokeColor) {
        	if(strokeDirty) {
        		context.strokeStyle = strokeColor;
        		strokeDirty = false;
        	}
            context.lineWidth = lineWidth;
            context.stroke();
        }
	};
};
ig.draw = new PluginDraw();
});
