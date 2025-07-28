
class DrawableObject {
    
    x = 120;
    y = 280;
    height = 150;
    width = 80;
    img;
    imageCache = {};
    currentImage = 0;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {

        if(this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss){
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawHitFrame(ctx) {

        if(this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss){
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'green';
            ctx.rect(this.x - this.offset.left, this.y + this.offset.bottom, this.width - this.offset.right, this.height - this.offset.top);
            ctx.stroke();
        }
    }

    loadImages(arr) {
        arr.forEach(path => {        
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(1)';
            this.imageCache[path] = img;
        });
    }

}
