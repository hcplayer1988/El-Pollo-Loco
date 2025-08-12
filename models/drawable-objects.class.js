/**
 * Base class for all drawable objects in the game.
 * Provides functionality for loading images, drawing, and managing hitboxes.
 */
class DrawableObject {
    
    /** @type {number} Horizontal position of the object */
    x = 120;
    /** @type {number} Vertical position of the object */
    y = 280;
    /** @type {number} Height of the object in pixels */
    height = 150;
    /** @type {number} Width of the object in pixels */
    width = 80;
    /** @type {HTMLImageElement} The currently displayed image */
    img;
    /** @type {Object.<string, HTMLImageElement>} Cache of loaded images */
    imageCache = {};
    /** @type {number} Index of the current image in an animation sequence */
    currentImage = 0;
    /**
     * @type {{top: number, left: number, right: number, bottom: number}}
     * Offset values for collision detection
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Loads a single image and assigns it to the object.
     * @param {string} path - Path to the image file
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    
    /**
     * Draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Optionally draws a frame around the object for debugging.
     * Only applies to specific object types.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle){
            // ctx.beginPath();
            // ctx.lineWidth = '0';
            // ctx.strokeStyle = 'blue';
            // ctx.rect(this.x, this.y, this.width, this.height);
            // ctx.stroke();
        }
    }

    /**
     * Optionally draws the hitbox frame for collision debugging.
     * Only applies to specific object types.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    drawHitFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss|| this instanceof Coin || this instanceof Bottle){
            let x = this.x + this.offset.left;
            let y = this.y + this.offset.top;
            let width = this.width - this.offset.left - this.offset.right;
            let height = this.height - this.offset.top - this.offset.bottom;
            // ctx.beginPath();
            // ctx.lineWidth = '1';
            // ctx.strokeStyle = 'green';
            // ctx.rect(x, y, width, height);
            // ctx.stroke();
        }
    }

    /**
     * Loads multiple images and stores them in the image cache.
     * @param {string[]} arr - Array of image paths
     */
    loadImages(arr) {
        arr.forEach(path => {        
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(1)';
            this.imageCache[path] = img;
        });
    }

    /**
     * Flips the image horizontally for objects facing the opposite direction.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    flipImage(ctx) {
        ctx.save();
        ctx.translate(this.width, 0);
        ctx.scale(-1, 1);
        this.x = this.x * -1;
    }

    /**
     * Restores the original orientation of a flipped image.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    flipImageBack(ctx) {
        this.x = this.x * -1;
        ctx.restore();
    }  
}
