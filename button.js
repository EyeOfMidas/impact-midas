ig.module(
    'plugins.midas.button'
)
.requires(
    'impact.entity'
)
.defines(function() {

EntityButton = ig.Entity.extend({
    size: { x: 80, y: 40 },
    animSheet: null,
    state: 'idle',
    wasPreviouslyPressed: false,
    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        this.addAnim( 'idle', 1, [0] );
        this.addAnim( 'active', 1, [1] );
        this.addAnim( 'hover', 1, [2] );
    },
    update: function() {
        if ( this.state !== 'hidden' ) {
            var isClicked = ig.input.state('click');

            if (this.mouseWithinButton()) {
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
                        this.onRelease();
                    }
                    this.wasPreviouslyPressed = false;
                }
            } else {
                this.setState('idle');
                this.wasPreviouslyPressed = false;
            }
        }
    },
    draw: function() {
        if ( this.state !== 'hidden' ) {
            this.parent();
        }
    },
    setState: function( s ) {
        this.state = s;
        if ( this.state !== 'hidden' ) {
            this.currentAnim = this.anims[ this.state ];
        }
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