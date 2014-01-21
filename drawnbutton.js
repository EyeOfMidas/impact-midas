ig.module(
    'plugins.midas.drawnbutton'
)
.requires(
    'impact.entity',
    
    'plugins.midas.draw'
)
.defines(function() {

EntityDrawnButton = ig.Entity.extend({
    size: { x: 80, y: 40 },
    state: 'idle',
    wasPreviouslyPressed: false,
    wasPreviouslyHovered: false,
    text: "Submit",
    font: null,
    fillColors: {idle: "#FF0000",
    		hover: "#FF8888",
    		active: "#FF8888" },
    strokeColors: {idle: null,
       		hover: null,
       		active: null },
    buttonFillColor: "#FF0000",
    buttonStrokeColor: null,
    init: function( x, y, settings ) {
        this.parent( x, y, settings );
    },
    update: function() {
        if ( this.state == 'hidden' ) {
        	return;
        }
        if(this.font != null) {
        	this.font.alpha = 1;
        	if(this.size.x < this.font.widthForString(this.text)) {
        		this.size.x = this.font.widthForString(this.text);
        	}
        	if(this.size.y < this.font.heightForString(this.text)) {
        		this.size.y = this.font.heightForString(this.text);
        	}
        }

        var isClicked = ig.input.state('click');

        if (this.mouseWithinButton()) {
        	this.wasPreviouslyHovered = true;
         	document.body.style.cursor = "pointer";
            if (isClicked) {
                this.setState('active');
                if (this.wasPreviouslyPressed) {
                    this.pressed();
                } else {
                    this.onPress();
                }
                this.wasPreviouslyPressed = true;
            } else {
                this.setState('hover');
                if (this.wasPreviouslyPressed) {
                	document.body.style.cursor = "default";
                    this.onRelease();
                }
                this.wasPreviouslyPressed = false;
            }
        } else {
        	if(this.wasPreviouslyHovered) {
        		document.body.style.cursor = "default";
        		this.setState('idle');
        		this.wasPreviouslyPressed = false;        		
        	}
        }
    },
    draw: function() {
        if ( this.state == 'hidden' ) {
        	return;
        }
        ig.draw.setStroke(this.strokeColors[this.state]);
        ig.draw.setFill(this.fillColors[this.state]);
        ig.draw.rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        if(this.font != null) {
        	this.font.draw(this.text, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2 - this.font.heightForString(this.text) / 2, ig.Font.ALIGN.CENTER);        	
        }
        this.parent();
    },
    setState: function( s ) {
        this.state = s;
    },
    onPress: function() {},
    pressed: function() {},
    onRelease: function() {},
    mouseWithinButton: function() {
        return ig.input.mouse.x + ig.game.screen.x > this.pos.x &&
        ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x &&
        ig.input.mouse.y + ig.game.screen.y > this.pos.y &&
        ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
    }
});
 
});