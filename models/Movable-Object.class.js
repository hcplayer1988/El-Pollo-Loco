class MovableObject extends DrawableObject {

    speed = 0.07;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 100;
    lastHit = 0;
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

    // character is ccolliding(chicken)
    isColliding(mo) {
        return this.x + this.width > mo.x &&    // rechte kante pepe zu linke kante enemy
            this.y + this.height > mo.y &&      // unterkante pepe ztu oberkante enemy
            this.x < mo.x + mo.width &&         // linke kante pepe zu rechter kante enemy
            this.y < mo.y + mo.height           // oberkante pepe zu untere kante enemy (wird hier nicht benötigt)
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            this.hurtAnimationTriggered = true;
            setTimeout(() => {
                this.hurtAnimationTriggered = false;
            }, 1000);
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        //timepassed = timepassed / 1000; // difference in s
        return timepassed < 500;
    }

    isDead() {
       return  this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 7 % 6; => 1, rest 1 ==> i = 0, 1, 2, 3, 4 , 5, 0, 1, 2, 3, 4, 5, 0, .....usw.
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

