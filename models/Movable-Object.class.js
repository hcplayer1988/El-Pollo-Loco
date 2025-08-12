/**
 * Represents a drawable object that can move and interact with gravity, collisions, and animations.
 * Inherits from DrawableObject and adds movement, physics, and combat logic.
 */
class MovableObject extends DrawableObject {

    /** @type {number} Horizontal movement speed */
    speed = 0.07;
    /** @type {boolean} Indicates if the object is facing the opposite direction */
    otherDirection = false;
    /** @type {number} Vertical speed for jumping and falling */
    speedY = 0;
    /** @type {number} Acceleration due to gravity */
    acceleration = 3;
    /** @type {number} Current energy level (health) */
    energy = 100;
    /** @type {number} Timestamp of the last hit received */
    lastHit = 0;

    /**
     * Applies gravity to the object, updating its vertical position over time.
     * Called repeatedly via setInterval.
     */
    applyGravity() { 
        setInterval(() => {
            this.lastBottomBeforeHit = this.y + this.height;
            if (this.isAboveGround() || this.speedY > 0)
                this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 25); 
    }

    /**
     * Checks whether the object is above the ground.
     * ThrowableObjects are always considered above ground.
     * @returns {boolean} True if above ground
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { 
            return true;
        } else {
            return this.y < 270;
        }
    }

    /**
     * Checks for collision with another MovableObject.
     * @param {MovableObject} mo - The other object to check collision against
     * @returns {boolean} True if colliding
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Applies damage to the object and triggers hurt animation if not recently hit.
     * @param {number} damage - Amount of damage to apply
     */
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

    /**
     * Checks if the object is currently in a hurt state.
     * @returns {boolean} True if hurt
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 500;
    }

    /**
     * Checks if the object is dead (energy is zero).
     * @returns {boolean} True if dead
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays an animation by cycling through the provided image paths.
     * @param {string[]} images - Array of image paths for the animation
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right based on its speed.
     */
    moveRight() {
        this.x += this.speed;  
    }

    /**
     * Moves the object to the left based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Initiates a jump by setting vertical speed.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Resets the object's position, speed, direction, and animation state.
     * Also stops any active sounds or animations if applicable.
     */
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

    /**
     * Handles collision logic between this enemy and the character.
     * @param {Character} character - The player character
     */
    handleCollisionWithCharacter(character) {
        if (this instanceof SmallChicken || this instanceof Chicken) {
            if (this.isHitFromAbove(character)) {
                this.die();
            } else {
                character.hit(this.damage);
            }
        } else {
            character.hit(this.damage);
        }
    }

    /**
     * Handles being hit by a bottle.
     * Reduces energy or triggers death depending on type.
     * @param {World} world - Reference to the game world (for UI updates)
     */
    handleBottleHit(world) {
        if (this instanceof Chicken || this instanceof SmallChicken) {
            this.energy = 0;
            this.die();
        } else if (this instanceof Endboss) {
            if (!this.isDead()) {
                this.hit(16.67);
                world.endbossBar.setPercentage(this.energy);
                if (this.energy <= 0) {
                    this.die();
                }
            }
        }
    }
}
