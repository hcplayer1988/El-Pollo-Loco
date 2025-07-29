
class Statusbar extends DrawableObject {

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

    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex();
        let path = this.images[index];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage === 100) return 5;
        else if (this.percentage > 80) return 4;
        else if (this.percentage > 60) return 3;
        else if (this.percentage > 40) return 2;
        else if (this.percentage > 20) return 1;
        else return 0;
    }
}
