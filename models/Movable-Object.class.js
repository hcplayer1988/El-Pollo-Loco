
class MovableObject extends DrawableObject {

    speed = 0.07;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 100;
    lastHit = 0;

    applyGravity() { 
        setInterval( () => {
            this.lastBottomBeforeHit = this.y + this.height;
            if (this.isAboveGround() || this.speedY > 0)
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 25); 
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {  // Throwable object should always fall
            return true;
        } else {
            return this.y < 270
        }
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&    // rechte kante pepe zu linke kante enemy
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&      // unterkante pepe ztu oberkante enemy
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&         // linke kante pepe zu rechter kante enemy
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;           // oberkante pepe zu untere kante enemy (wird hier nicht benötigt)
    }

    hit() {
        let now = new Date().getTime();
        if (now - this.lastHit < 300) return;
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = now;
            this.hurtAnimationTriggered = true;
            setTimeout(() => {
                this.hurtAnimationTriggered = false;
            }, 500);
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


