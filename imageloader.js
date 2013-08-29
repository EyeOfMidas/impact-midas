ig.module(
    'plugins.imageloader'
)
.requires(
    'impact.impact'
    ,'plugins.imageasset'
    ,'plugins.ajaxpromise'
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
    }
});
});