ig.module(
    'plugins.midas.contextmanipulation'
)
.requires(
    'impact.impact'
)
.defines(function() {

ContextManipulation = ig.Class.extend({
    translate: function() {
    
    },
    rotate: function(context, centerPoint, rotationAngle, drawFunction) {
   	    context.save();
  	    context.translate(centerPoint.x,centerPoint.y);
    	context.rotate(rotationAngle*Math.PI/180);
  	    context.translate(-centerPoint.x, -centerPoint.y);
    	drawFunction();

    	context.restore();
    },
    scale: function(context, centerPoint, scale, drawFunction) {
    	context.save();
  	    context.translate(centerPoint.x,centerPoint.y);
    	context.scale(scale, scale);
  	    context.translate(-centerPoint.x,-centerPoint.y);
    	drawFunction();
    	context.restore();
    }
});
ig.manipulate = new ContextManipulation();
 
});