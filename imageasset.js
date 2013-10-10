ig.module(
    'plugins.midas.imageasset'
)
.requires(
    'impact.image'
)
.defines(function() {
ImageAsset = ig.Image.extend({
    asyncLoaded: false,
    init: function(asyncImage) {
        if (asyncImage) {
            this.data = asyncImage;
            this.width = asyncImage.width;
            this.height = asyncImage.height;
            this.loaded = true;
            this.asyncLoaded = true;
            if( ig.system.scale != 1 ) {
                this.resize( ig.system.scale );
            }
        }
        
    }
});
});