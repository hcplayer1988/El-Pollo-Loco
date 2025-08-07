
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
        if (this instanceof ThrowableObject) { 
            return true;
        } else {
            return this.y < 270
        }
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    hit(damage) {
        let now = new Date().getTime();
        if (now - this.lastHit < 300) return;
        this.energy -= damage;
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
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 500;
    }

    isDead() {
       return  this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
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

    reset() {
        this.x = this.defaultX ?? 0;
        this.y = this.defaultY ?? 0;
        this.speed = this.defaultSpeed ?? 0;
        this.otherDirection = false;
        this.hurtAnimationTriggered = false;
        this.lastActionTime = Date.now();
        if (this.stopAllSounds) this.stopAllSounds();
        if (this.stopAnimation) this.stopAnimation();
        if (this.resetAnimation) this.resetAnimation();
    }
}


