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
    lineCap = null,
    strokeDirty = false,
    fillDirty = false,
    lineCapDirty = false;

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
    
    this.setLineCap = function(newLineCap) {
    	if(lineCap != newLineCap) {
    		lineCapDirty = true;
    	}
    	lineCap = newLineCap;
    };
    
    this.getContext = function() {
    	return ig.system.context;
    };

    this.rect = function(x, y, width, height) {
		var context = this.getContext();
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
		var context = this.getContext();
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
	    if(lineCapDirty) {
	    	context.lineCap = lineCap;
	    	lineCapDirty = false;
	    }
	    context.stroke();
    };

    this.point = function(x, y) {
		this.line(x, y, x + 1, y + 1);
    };
	this.reset = function() {
		var context = this.getContext();
		this.strokeColor = "#000000";
		this.lineWidth = 1;
		this.fillColor = null;
		context.strokeStyle = strokeColor;
		context.fillStyle = fillColor;
		context.lineWidth = lineWidth;
		
	};
	
	this.circle = function(centerX, centerY, radius) {
		var context = this.getContext();
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
	
	this.poly = function(points) {
		var context = this.getContext();
		context.beginPath();
		context.moveTo(points[0][0], points[0][1]);
		for(var i = 1; i < points.length; i++) {
			context.lineTo(points[i][0], points[i][1]);
		}
		context.closePath();
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
