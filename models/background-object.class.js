/**
 * Represents a background object in the game world.
 * Extends the MovableObject class and is used to render background layers.
 */
class BackgroundObject extends MovableObject {
    /** @type {number} Width of the background object in pixels */
    width = 720;

    /** @type {number} Height of the background object in pixels */
    height = 480;
    
    /**
     * Creates a new BackgroundObject.
     * Loads the image and sets the object's position.
     *
     * @param {string} imagePath - The path to the image file.
     * @param {number} x - The horizontal position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    };
}
