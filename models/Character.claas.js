
class Character extends MovableObject {
    images_walking = [
        'assets/img/ingame_imgs/2.character.pepe/2.walk/W-21.png',
        'assets/img/ingame_imgs/2.character.pepe/2.walk/W-22.png',
        'assets/img/ingame_imgs/2.character.pepe/2.walk/W-23.png',
        'assets/img/ingame_imgs/2.character.pepe/2.walk/W-24.png',
        'assets/img/ingame_imgs/2.character.pepe/2.walk/W-25.png',
        'assets/img/ingame_imgs/2.character.pepe/2.walk/W-26.png'
    ];
    images_jumping = [
        'assets/img/ingame_imgs/2.character.pepe/3.jump/J-31.png',
        'assets/img/ingame_imgs/2.character.pepe/3.jump/J-32.png',
        'assets/img/ingame_imgs/2.character.pepe/3.jump/J-33.png',
        'assets/img/ingame_imgs/2.character.pepe/3.jump/J-34.png',
        'assets/img/ingame_imgs/2.character.pepe/3.jump/J-35.png',
        'assets/img/ingame_imgs/2.character.pepe/3.jump/J-36.png',
        'assets/img/ingame_imgs/2.character.pepe/3.jump/J-37.png',
        'assets/img/ingame_imgs/2.character.pepe/3.jump/J-38.png',
        'assets/img/ingame_imgs/2.character.pepe/3.jump/J-39.png'

    ];
    images_dead = [
        'assets/img/ingame_imgs/2.character.pepe/5.dead/D-51.png',
        'assets/img/ingame_imgs/2.character.pepe/5.dead/D-52.png',
        'assets/img/ingame_imgs/2.character.pepe/5.dead/D-53.png',
        'assets/img/ingame_imgs/2.character.pepe/5.dead/D-54.png',
        'assets/img/ingame_imgs/2.character.pepe/5.dead/D-55.png',
        'assets/img/ingame_imgs/2.character.pepe/5.dead/D-56.png',
        'assets/img/ingame_imgs/2.character.pepe/5.dead/D-57.png'
    ];
    images_hurt = [
        'assets/img/ingame_imgs/2.character.pepe/4.hurt/H-41.png',
        'assets/img/ingame_imgs/2.character.pepe/4.hurt/H-42.png',
        'assets/img/ingame_imgs/2.character.pepe/4.hurt/H-43.png'
    ];
    images_idle = [
        'assets/img/ingame_imgs/2.character.pepe/1.idle/idle/I-1.png',
        'assets/img/ingame_imgs/2.character.pepe/1.idle/idle/I-2.png',
        'assets/img/ingame_imgs/2.character.pepe/1.idle/idle/I-3.png',
        'assets/img/ingame_imgs/2.character.pepe/1.idle/idle/I-4.png',
        'assets/img/ingame_imgs/2.character.pepe/1.idle/idle/I-5.png',
        'assets/img/ingame_imgs/2.character.pepe/1.idle/idle/I-6.png',
        'assets/img/ingame_imgs/2.character.pepe/1.idle/idle/I-7.png',
        'assets/img/ingame_imgs/2.character.pepe/1.idle/idle/I-8.png',
        'assets/img/ingame_imgs/2.character.pepe/1.idle/idle/I-9.png',
        'assets/img/ingame_imgs/2.character.pepe/1.idle/idle/I-10.png'
    ];
    images_idle_long = [
        'assets/img/ingame_imgs/2.character.pepe/1.idle/long_idle/I-11.png',
        'assets/img/ingame_imgs/2.character.pepe/1.idle/long_idle/I-12.png',
        'assets/img/ingame_imgs/2.character.pepe/1.idle/long_idle/I-13.png',
        'assets/img/ingame_imgs/2.character.pepe/1.idle/long_idle/I-14.png',
        'assets/img/ingame_imgs/2.character.pepe/1.idle/long_idle/I-15.png',
        'assets/img/ingame_imgs/2.character.pepe/1.idle/long_idle/I-16.png',
        'assets/img/ingame_imgs/2.character.pepe/1.idle/long_idle/I-17.png',
        'assets/img/ingame_imgs/2.character.pepe/1.idle/long_idle/I-18.png',
        'assets/img/ingame_imgs/2.character.pepe/1.idle/long_idle/I-19.png',
        'assets/img/ingame_imgs/2.character.pepe/1.idle/long_idle/I-20.png'
    ];

    walking_sound = new Audio('audio/fast_walk_sand.mp3');
    currentImage = 0;
    world;
    speed = 4;
    lastBottomBeforeHit = null;
    //bottle = new ThrowableObject(this.x, this.y, this.otherDirection);

    offset = {
        top: 50,
        left: 10,
        right: 10,
        bottom: 6
    };

    constructor() {
        super().loadImage('assets/img/ingame_imgs/2.character.pepe/1.idle/idle/I-1.png')
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_dead);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_idle);
        this.loadImages(this.images_idle_long);
        this.applyGravity();
        this.animate();
        this.lastActionTime = Date.now();
        this.idleLongPlayed = false;
        this.idleLongStartTime = null;
    }

    animate() {
        setInterval(() => {
            this.handleMovement();
            this.updateCamera();
            this.resetIdleTimerIfActive();
        }, 1000 / 60);

        setInterval(() => {
            this.handleHurtOrDeathAnimation() || this.handleMovementAnimation();
        }, 1000 / 25);

        setInterval(() => {
            this.handleIdleAnimation();
        }, 1000 / 10);
}


    // handleMovement() {
    //     this.lastBottomBeforeHit = this.y + this.height;
    //     this.walking_sound.pause();
    //     this.actionOccurred = false;
    //     if (this.world.keyboard.d_right && this.x < this.world.level.level_end_x) {
    //         this.moveRight();
    //         this.otherDirection = false;
    //         this.walking_sound.play();
    //         this.actionOccurred = true;
    //     }
    //     if (this.world.keyboard.a_left && this.x > -600) {
    //         this.moveLeft();
    //         this.otherDirection = true;
    //         this.walking_sound.play();
    //         this.actionOccurred = true;
    //     }
    //     if (this.world.keyboard.w_jump && !this.isAboveGround()) {
    //         this.jump();
    //         this.actionOccurred = true;
    //         }
    // }

    handleMovement() {
        this.lastBottomBeforeHit = this.y + this.height;
        this.walking_sound.pause();
        this.actionOccurred = false;

        this.handleRightMovement();
        this.handleLeftMovement();
        this.handleJump();
    }

    handleRightMovement() {
        if (this.world.keyboard.d_right && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.walking_sound.play();
            this.actionOccurred = true;
        }
    }

    handleLeftMovement() {
        if (this.world.keyboard.a_left && this.x > -600) {
            this.moveLeft();
            this.otherDirection = true;
            this.walking_sound.play();
            this.actionOccurred = true;
        }
    }

    handleJump() {
        if (this.world.keyboard.w_jump && !this.isAboveGround()) {
            this.jump();
            this.actionOccurred = true;
        }
    }



    updateCamera() {
        this.world.camera_x = -this.x + 100;
    }

    resetIdleTimerIfActive() {
        if (this.actionOccurred || this.hurtAnimationTriggered || this.isDead()) {
            this.lastActionTime = Date.now();
            this.idleLongPlayed = false;
            this.idleLongStartTime = null;
        }
    }

    handleAnimation() {
        this.handleHurtOrDeathAnimation() ||
        this.handleMovementAnimation() ||
        this.handleIdleAnimation();
    }

    handleHurtOrDeathAnimation() {
        if (this.hurtAnimationTriggered) {
            this.playAnimation(this.images_hurt);
            return true;
        }
        if (this.isDead()) {
            this.playAnimation(this.images_dead);
            return true;
        }
        return false;
    }

    handleMovementAnimation() {
        if (this.isAboveGround()) {
            this.playAnimation(this.images_jumping);
            return true;
        }
        if (this.world.keyboard.d_right || this.world.keyboard.a_left) {
            this.playAnimation(this.images_walking);
            return true;
        }
        return false;
    }

    handleIdleAnimation() {
        let now = Date.now();
        let inactiveTime = now - this.lastActionTime;

        if (inactiveTime > 5000 || this.idleLongPlayed) {
            this.playAnimation(this.images_idle_long);
            this.idleLongPlayed = true;
        } else {
            this.playAnimation(this.images_idle);
        }
    }

}
