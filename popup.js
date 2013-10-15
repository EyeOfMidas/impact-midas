ig.module(
    'plugins.midas.popup'
)
.requires(
    'impact.impact',
    'impact.font',
	
	'plugins.midas.draw'
	
)
.defines(function(){
PluginPopup = ig.Class.extend({
	pos: {x: 0, y: 0},
	size: {x: 500, y: 75},
	fontSize: {x: 0, y: 0},
	padding: {top: 20, left: 20, bottom: 20, right: 20},
	imagePadding: 10,
	font: new ig.Font('common/proxima-semibold-24-white.font.png'),
	image: new ig.Image('common/pointer.png'),
	text: "",
    init: function(text, x, y) {
    	this.text = text;
		this.pos.x = x;
		this.pos.y = y;
		
		this.size.x = this.padding.left + this.padding.right;
		this.size.y = this.padding.top + this.padding.bottom;
		
		if(this.text != "") {
			this.fontSize.x = this.font.widthForString(this.text);
			this.fontSize.y = this.font.heightForString(this.text);
			this.size.x += this.fontSize.x;
			this.size.y += this.fontSize.y;
		}
		if(this.image) {
			this.size.x += this.image.width;
			if(this.image.height > this.size.y) {
				this.size.y = this.image.height + this.padding.top + this.padding.bottom;
			}
		}
		
		if(this.image && this.text != "") {
			this.size.x += this.imagePadding;
		}
    },
    update: function() {
    	
    },
    
    draw: function() {
		ig.draw.setStroke(null);
		ig.draw.setFill("rgba(0,0,0,0.2)");
		ig.draw.rect(this.pos.x - this.size.x / 2, this.pos.y - this.size.y / 2, this.size.x, this.size.y);
		var textCenter = {x: this.pos.x, y: this.pos.y - this.fontSize.y / 2};
		if(this.image) {
			this.image.draw(this.pos.x - (this.size.x / 2) + this.padding.left, this.pos.y - this.image.height / 2);
			textCenter.x += this.image.width / 2 + this.imagePadding;
		}
		if(this.text != "") {
			this.font.draw(this.text, textCenter.x, textCenter.y, ig.Font.ALIGN.CENTER);
		}
    }
});
});