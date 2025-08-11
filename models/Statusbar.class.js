/**
 * Represents a status bar that visually displays a percentage value.
 * Inherits from DrawableObject and updates its image based on the current percentage.
 */
class Statusbar extends DrawableObject {

    /**
     * Creates a new Statusbar instance.
     * Loads the provided images and sets the initial percentage.
     * @param {string[]} imagesArray - Array of image paths representing different percentage levels
     * @param {number} initialPercentage - Initial percentage value to display (0–100)
     */
    constructor(imagesArray, initialPercentage) {
        super();
        this.images = imagesArray;
        this.percentage = initialPercentage;
        this.loadImages(this.images);
        this.setPercentage(initialPercentage);
        this.x = 20;
        this.y = 0;
        this.height = 50;
        this.width = 200;
    }

    /**
     * Updates the status bar's percentage and sets the corresponding image.
     * @param {number} percentage - New percentage value to display (0–100)
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex();
        let path = this.images[index];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index based on the current percentage.
     * @returns {number} Index of the image that corresponds to the current percentage
     */
    resolveImageIndex() {
        if (this.percentage === 100) return 5;
        else if (this.percentage > 80) return 4;
        else if (this.percentage > 60) return 3;
        else if (this.percentage > 40) return 2;
        else if (this.percentage > 20) return 1;
        else return 0;
    }
}
