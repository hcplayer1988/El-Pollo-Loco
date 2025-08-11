/**
 * Represents a small chicken enemy in the game.
 * Inherits from MovableObject and includes behavior for movement, collision, and death.
 */
class SmallChicken extends MovableObject {

    /** @type {number} Vertical position of the chicken */
    y = 392;
    /** @type {number} Width of the chicken */
    width = 30;
    /** @type {number} Height of the chicken */
    height = 30;
    /**
     * @type {{top: number, left: number, right: number, bottom: number}}
     * Offset values for collision detection
     */
    offset = {
        top: 1,
        left: 3,
        right: 3,
        bottom: 0
    };
    /** @type {number} Damage dealt by the chicken */
    damage = 5;
    /** @type {boolean} Indicates whether the chicken is dead */
    dead = false;
    /** @type {boolean} Marks the chicken for removal from the game */
    markedForDeletion = false;
    /** @type {HTMLAudioElement} Sound played when the chicken dies */
    dead_sound = new Audio('audio/destroy_chicken.mp3');
    /** @type {string[]} Image paths for walking animation */
    images_walking = [
        'assets/img/ingame_imgs/3.enemies.chicken/chicken_small/1_walk/1_w.png',
        'assets/img/ingame_imgs/3.enemies.chicken/chicken_small/1_walk/2_w.png',
        'assets/img/ingame_imgs/3.enemies.chicken/chicken_small/1_walk/3_w.png',
    ];
    /** @type {string[]} Image paths for death animation */
    images_dead = [
        'assets/img/ingame_imgs/3.enemies.chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Creates a SmallChicken instance with randomized position and speed.
     * Loads animations and registers death sound.
     */
    constructor() {
        super().loadImage('assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.images_walking);
        this.x = 650 + Math.random() * 900; 
        this.speed = 0.1 + Math.random() * 0.4; 
        this.animate();
        this.defaultX = this.x;
        this.defaultY = this.y;
        this.defaultSpeed = this.speed;
        soundhub.addSound(this.dead_sound);
    }

    /**
     * Starts the animation loop for walking or death state.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
                this.playAnimation(this.images_walking);
            } else {
                this.img = this.imageCache[this.images_dead[0]];
            }
        }, 1000 / 20); 
    }

    /**
     * Checks if the chicken is dead.
     * @returns {boolean} True if dead
     */
    isDead() {
        return this.dead;
    }

    /**
     * Determines if the character has hit the chicken from above.
     * @param {MovableObject} character - The character object
     * @returns {boolean} True if hit from above
     */
    isHitFromAbove(character) {
        let characterBottom = character.y + character.height;
        let chickenTop = this.y + this.offset.top;
        let horizontalOverlap =
            character.x + character.width > this.x + this.offset.left &&
            character.x < this.x + this.width - this.offset.right;
        let verticalHit =
            characterBottom < chickenTop + 32 &&
            character.y < this.y &&
            character.speedY < 0;
        return horizontalOverlap && verticalHit;
    }

    /**
     * Triggers the death sequence for the chicken.
     * Stops movement, plays sound, and marks for deletion.
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
     * Checks collision with another chicken and handles hit or death logic.
     * @param {SmallChicken} chicken - Another chicken to check collision against
     */
    checkCollisionWithChicken(chicken) {
        if (this.isColliding(chicken)) {
            if (!chicken.isDead() && !chicken.isHitFromAbove(this)) {
                this.hit();
            } else if (!chicken.isDead() && chicken.isHitFromAbove(this)) {
                chicken.die();
            }
        }
    } 
}
