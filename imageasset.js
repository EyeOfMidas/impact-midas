ig.module(
    'plugins.imageasset'
)
.requires(
    'impact.image'
)
.defines(function() {
ImageAsset = ig.Image.extend({
    init: function(asyncImage) {
        if (asyncImage) {
            this.data = asyncImage;
            this.width = asyncImage.width;
            this.height = asyncImage.height;
            this.loaded = true;

            if( ig.system.scale != 1 ) {
                this.resize( ig.system.scale );
            }
        }

    }
});
});