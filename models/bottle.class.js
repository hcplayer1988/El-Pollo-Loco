/**
 * Represents a salsa bottle collectible object in the game.
 * Extends the MovableObject class and includes position, size, and collision offset.
 */
class Bottle extends MovableObject {

    /** @type {number} Vertical position of the bottle */
    y = 360;
    /** @type {number} Width of the bottle in pixels */
    width = 70;
    /** @type {number} Height of the bottle in pixels */
    height = 70;

    /**
     * @type {{top: number, left: number, right: number, bottom: number}}
     * Collision offset values for fine-tuning hit detection
     */
    offset = {
        top: 10,
        left: 20,
        right: 20,
        bottom: 6,
    };

    /**
     * Creates a new Bottle object.
     * Loads the image and sets randomized position and default values.
     */
    constructor() {
        super();
        this.loadImage('assets/img/ingame_imgs/6.salsa.bottle/2_salsa_bottle_on_ground.png');
        this.x = 500 + Math.random() * 2900;
        this.y = 360 - Math.random() * 250;
        this.defaultX = this.x;
        this.defaultY = this.y;
        this.defaultSpeed = this.speed;
    }
}
