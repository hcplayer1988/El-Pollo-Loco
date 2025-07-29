
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

    walking_sound = new Audio('audio/fast_walk_sand.mp3');
    currentImage = 0;
    world;
    speed = 4;

    offset = {
        top: 50,
        left: 10,
        right: 10,
        bottom: 5
    };

    constructor() {
        super().loadImage('assets/img/ingame_imgs/2.character.pepe/2.walk/W-21.png')
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_dead);
        this.loadImages(this.images_hurt);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval( () => {
            this.walking_sound.pause();
            // walking right
            if (this.world.keyboard.d_right && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }

            // walking left
            if (this.world.keyboard.a_left && this.x > -600) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }
            
            // jumping
            if(this.world.keyboard.w_jump && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x +80;
        }, 1000 / 60);

        setInterval(() => {
            if (this.hurtAnimationTriggered) {
                this.playAnimation(this.images_hurt);
            } else if (this.isDead()) {
                this.playAnimation(this.images_dead);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.images_jumping);
            } else {
                if (this.world.keyboard.d_right || this.world.keyboard.a_left) {
                    this.playAnimation(this.images_walking);
                }
            }   
        }, 1000 / 25);
    }
}
