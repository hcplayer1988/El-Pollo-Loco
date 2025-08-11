/**
 * Represents a collectible coin object in the game.
 * Inherits from MovableObject and includes position, size, and collision offset.
 */
class Coin extends MovableObject {

    /** @type {number} Width of the coin in pixels */
    width = 150;
    /** @type {number} Height of the coin in pixels */
    height = 150;
    /**
     * @type {{top: number, left: number, right: number, bottom: number}}
     * Collision offset values for fine-tuning hit detection
     */
    offset = {
        top: 55,
        left: 55,
        right: 55,
        bottom: 55
    };

    /**
     * Creates a new Coin instance.
     * Loads the coin image and sets a random position within the level.
     */
    constructor() {
        super();
        this.loadImage('assets/img/ingame_imgs/8.coin/coin_1.png');
        this.x = 500 + Math.random() * 2800;
        this.y = 330 - Math.random() * 250;
        this.defaultX = this.x;
        this.defaultY = this.y;
        this.defaultSpeed = this.speed;
    }
}
