class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 80;
    imageCache = {};
    currentImage = 0;
    speed = 0.07;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 100;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    applyGravity() { 
        setInterval( () => {
            if (this.isAboveGround() || this.speedY > 0)
            this.y -= this.speedY;
            this.speedY -= this.acceleration;

        }, 1000 / 25); 
    }

    isAboveGround() {
        return this.y < 270
    }

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
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // character is ccolliding(chicken)
    isColliding(mo) {
        return this.x + this.width > mo.x &&    // rechte kante pepe zu linke kante enemy
        this.y + this.height > mo.y &&          // unterkante pepe ztu oberkante enemy
        this.x < mo.x + mo.width &&           // linke kante pepe zu rechter kante enemy
        this.y < mo.y + mo.height               // oberkante pepe zu untere kante enemy (wird hier nicht benötigt)
    }

/*  colliding with inner offset!!
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&    
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&          
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&           
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom           
    }
*/

    loadImages(arr) {
        arr.forEach(path => {        
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % this.images_walking.length; // let i = 7 % 6; => 1, rest 1 ==> i = 0, 1, 2, 3, 4 , 5, 0, 1, 2, 3, 4, 5, 0, .....usw.
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;  
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}

