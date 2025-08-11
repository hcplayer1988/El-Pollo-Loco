
/**
 * Represents a throwable object, such as a salsa bottle, that moves and rotates when thrown.
 * Inherits from MovableObject and includes animation and directional movement.
 */
class ThrowableObject extends MovableObject {
    /**
     * Array of image paths used for the rotation animation of the throwable object.
     * @type {string[]}
     */
    images_rotate = [
        'assets/img/ingame_imgs/6.salsa.bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/ingame_imgs/6.salsa.bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/ingame_imgs/6.salsa.bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/ingame_imgs/6.salsa.bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Creates a new ThrowableObject instance at the given position and direction.
     * Loads rotation images and initiates the throw animation.
     * @param {number} x - Initial x-coordinate of the object
     * @param {number} y - Initial y-coordinate of the object
     * @param {boolean} otherDirection - Determines the direction of the throw (true = left, false = right)
     */
    constructor(x, y, otherDirection) {
        super().loadImage('assets/img/ingame_imgs/6.salsa.bottle/bottle_rotation/1_bottle_rotation.png')
        this.loadImages(this.images_rotate);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.otherDirection = otherDirection;
        this.trow();
    }

    /**
     * Initiates the throw behavior by applying gravity and setting horizontal movement.
     * Also starts the rotation animation at a fixed interval.
     */
    trow() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if (this.otherDirection) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 25);
        setInterval(() => {
            this.playAnimation(this.images_rotate);
        }, 1000 / 20);
    }
}
