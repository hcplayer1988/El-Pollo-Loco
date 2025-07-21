class BackgroundObject  extends MovableObject {
    width = 720;

    constructor(imagePath) {
        super().loadImage(imagePath, x, y);
        this.x = x;
        this.y = y;
    }
}