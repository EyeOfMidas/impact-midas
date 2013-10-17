ig.module(
    'plugins.midas.imageloader'
)
.requires(
    'impact.impact'
    ,'plugins.midas.imageasset'
    ,'plugins.midas.ajaxpromise'
)
.defines(function(){
PluginImageLoader = ig.Class.extend({
    getImage: function(path) {
        var promise = new PluginAjaxPromise();
        var asyncImage = new Image();
        asyncImage.onload = function(event) {
            promise.setResult(asyncImage);
            promise.resolve();
        };
        asyncImage.onerror = function(event) {
            promise.setResult(asyncImage);
            promise.reject();
        };
        asyncImage.src = path;
        return promise;
    },
    loadImage: function(path, imageAsset) {
    	var promise = this.getImage(path);
    	promise.done(function(result) {
			imageAsset.init(result);
		});
    	return promise;
    }
});
});