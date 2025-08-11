/**
 * Represents a cloud object in the background.
 * Moves slowly across the screen and resets position when off-screen.
 * Inherits from MovableObject.
 */
class Cloud extends MovableObject {

    /** @type {number} Width of the cloud in pixels */
    width = 500;
    /** @type {number} Height of the cloud in pixels */
    height = 350;

    /**
     * Creates a new Cloud instance.
     * Loads the cloud image, sets random position and speed, and starts animation.
     */
    constructor() {
        super().loadImage('assets/img/ingame_imgs/5.background/layers/4_clouds/1.png')
        this.x = -500 + Math.random() * 3700; // random number between 0 and 3000
        this.y = Math.random() * 70 + 10;
        this.speed = 0.05 + Math.random() * 0.11;
        this.animate();
        this.defaultX = this.x;
        this.defaultY = this.y;
        this.defaultSpeed = this.speed;
    };

    /**
     * Animates the cloud by moving it left continuously.
     * When the cloud moves off-screen, it resets to a new position and speed.
     */
    animate() {
        let animateCloud = () => {
            this.moveLeft();
            // When the cloud moves out of view → reposition it
            if (this.x + this.width < 0) {
                this.x = 3700 + Math.random() * 20;
                this.speed = 0.05 + Math.random() * 0.11; // fresh speed!
            }
            requestAnimationFrame(animateCloud);
        };
        requestAnimationFrame(animateCloud);
    }
}
