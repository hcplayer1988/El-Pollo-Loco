
/**
 * Represents a Chicken enemy in the game.
 * Handles movement, animation, collision detection, and death behavior.
 */
class Chicken extends MovableObject {

    /** @type {number} Vertical position of the chicken */
    y = 380;
    /** @type {number} Width of the chicken in pixels */
    width = 50;
    /** @type {number} Height of the chicken in pixels */
    height = 50;
    /**
     * @type {{top: number, left: number, right: number, bottom: number}}
     * Collision offset values for fine-tuning hit detection
     */
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 5
    };
    /** @type {number} Damage value inflicted by the chicken */
    damage = 10;
    /** @type {boolean} Indicates whether the chicken is dead */
    dead = false;
    /** @type {boolean} Marks the chicken for removal from the game */
    markedForDeletion = false;
    /** @type {HTMLAudioElement} Sound played when the chicken dies */
    dead_sound = new Audio('audio/destroy_chicken.mp3');
    /** @type {string[]} Animation frames for walking */
    images_walking = [
        'assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/3_w.png',
    ];
    /** @type {string[]} Animation frame for dead state */
    images_dead = [
        'assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/2_dead/dead.png'
    ];
    /** @type {number[]} Array of interval IDs for animation loops */
    chickenIntervals = [];
    /** @type {number|null} Timestamp when the chicken was paused */
    pausedAt = null;


    /**
     * Creates a new Chicken instance.
     * Loads images, sets random position and speed, and starts animation.
     */
    constructor() {
        super().loadImage('assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.images_walking);
        this.x = 1400 + Math.random() * 2200;
        this.speed = 0.1 + Math.random() * 0.7; 
        this.animate();
        this.defaultX = this.x;
        this.defaultY = this.y;
        this.defaultSpeed = this.speed;
        soundhub.addSound(this.dead_sound);
    }

    /**
     * Starts the walking animation and handles switching to dead image if necessary.
     */
    animate() {
        this.chickenIntervals.push(setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
                this.playAnimation(this.images_walking);
            } else {
                this.img = this.imageCache[this.images_dead[0]];
            }
        }, 1000 / 15));
    }

    /**
     * Stops all animation intervals.
    */
    stopAnimation() {
        this.chickenIntervals.forEach(clearInterval);
        this.chickenIntervals = [];
    }

    /**
     * Pauses all animations and sounds of the chicken.
     */
    pauseAnimation() {
        this.stopAnimation();
        this.pausedAt = Date.now();
    }

    /**
     * Resumes all animations and sounds of the chicken.
     */
    resumeAnimation() {
        this.animate();
        this.pausedAt = null;
    }

    /**
     * Checks if the chicken is dead.
     * @returns {boolean} True if dead, false otherwise.
     */
    isDead() {
        return this.dead;
    }

    /**
     * Determines if the character hits the chicken from above.
     * Used to trigger chicken death when stomped.
     *
     * @param {Character} character - The player character.
     * @returns {boolean} True if hit from above, false otherwise.
     */
    isHitFromAbove(character) {
        let characterBottom = character.y + character.height;
        let chickenTop = this.y + this.offset.top;
        let horizontalOverlap =
            character.x + character.width > this.x + this.offset.left &&
            character.x < this.x + this.width - this.offset.right;
        let verticalHit =
            characterBottom < chickenTop + 38 &&
            character.y < this.y &&
            character.speedY < 0;
        return horizontalOverlap && verticalHit;
    }

    /**
     * Kills the chicken, plays sound, switches image, and marks for deletion.
     */
    die() {
        this.dead = true;
        this.speed = 0;
        if (!soundhub.muted) {
            this.dead_sound.play();
        }
        this.loadImages(this.images_dead);
        this.img = this.imageCache[this.images_dead[0]];
        setTimeout(() => {
            this.markedForDeletion = true;
        }, 300);
    }

    /**
     * Checks collision between this chicken and another chicken.
     * Handles hit or death logic based on collision direction.
     *
     * @param {Chicken} chicken - Another chicken to check collision with.
     */
    checkCollisionWithChicken(chicken) {
        if (this.isColliding(chicken)) {
            if (!chicken.isDead() && !chicken.isHitFromAbove(this)) {
                this.hit()
            } else if (!chicken.isDead() && chicken.isHitFromAbove(this)) {
                chicken.die();
            }
        }
    }
}
