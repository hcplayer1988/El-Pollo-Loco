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
        console.log('Moving right');  
    }

    moveLeft() {
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 180); 
    }


}

