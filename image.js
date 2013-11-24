ig.module(
    'plugins.midas.image'
)
.requires(
		'plugins.midas.ajaxpromise',
		'plugins.midas.draw'
)
.defines(function() {
PluginImage = function(imagePath) {
	var originalImage = null,
	loaded = false,
	pos = {x: 0, y:0},
	customClipRect = false,
	clippingRect = {x: 0, y:0, width: 0, height: 0},
	width = 0,
	height = 0,
	scaleValues = {x: 1, y: 1},
	rotationPoint = {x: 0, y:0},
	scalePoint = {x:0, y:0},
	angle = 0;
	//TODO: handle static cache (only one image per url)
	//TODO: handle up-front and async loading
	//TODO: rotation and scaling are center-point
	//TODO: translation is top left
	this.init = function(settings) {
    	var promise = new PluginAjaxPromise();
    	originalImage = new Image();
    	originalImage.onload = function(event) {
            promise.setResult(event);
            promise.resolve();
        };
        originalImage.onerror = function(event) {
            promise.setResult(event);
            promise.reject();
        };
        originalImage.src = imagePath;
    	promise.done(function(result) {
    		width = originalImage.width;
    		height = originalImage.height;
    		if(!customClipRect) {
    			clippingRect.width = originalImage.width;
    			clippingRect.height = originalImage.height;
    		}
    		loaded = true;
		});
    	promise.fail(function(){
    		failed = true;
    	});
    	return promise;
    };
    
    this.setPos = function(x, y) {
    	pos.x = x;
    	pos.y = y;
    };
    
    this.getSize = function() {
    	return {width: width * scaleValues.x, height: height * scaleValues.y};
    };
	
	this.setClipRect = function(x, y, width, height) {
		customClipRect = true;
		clippingRect.x = x;
		clippingRect.y = y;
		clippingRect.width = width;
		clippingRect.height = height;
	};
		
	this.draw = function(context) {
		if(!loaded) { return; }
		context.save();
		context.translate(pos.x, pos.y);
	
		context.translate(rotationPoint.x, rotationPoint.y);
		context.rotate(angle*Math.PI/180);
		context.translate(-rotationPoint.x, -rotationPoint.y);
		
		context.translate(scalePoint.x, scalePoint.y);
		context.scale(scaleValues.x, scaleValues.y);
		context.translate(-scalePoint.x, -scalePoint.y);
		
		context.drawImage(originalImage,
				0, 0, width, height,
				0, 0, width, height);
		context.restore();
	};
	
	this.scale = function(xScale, yScale) {
		scaleValues.x = xScale;
		scaleValues.y = yScale;
	};
	
	this.rotate = function(angleValue) {
		angle += angleValue;
	};
	this.translate = function(x, y) {
		pos.x += x;
		pos.y += y;
	};
	
	this.isLoaded = function() {
		return loaded;
	};
};
});