
class Chicken extends MovableObject {
    y = 380;
    width = 50;
    height = 50;
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 5
    };
    damage = 10;
    dead = false;
    markedForDeletion = false;
    dead_sound = new Audio('audio/destroy_chicken.mp3');
    images_walking = [
        'assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/3_w.png',

    ];
    images_dead = [
        'assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/2_dead/dead.png'
    ];
    
    constructor() {
        super().loadImage('assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.images_walking);
        this.x = 1400 + Math.random() * 2200;
        this.speed = 0.1 + Math.random() * 0.7; 
        this.animate();
    }

   animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
                this.playAnimation(this.images_walking);
            } else {
                this.img = this.imageCache[this.images_dead[0]];
            }
        }, 1000 / 15);
    }

    isDead() {
        return this.dead;
    }

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

    die() {
        this.dead = true;
        this.speed = 0;
        this.dead_sound.play();
        this.loadImages(this.images_dead);
        this.img = this.imageCache[this.images_dead[0]];
        setTimeout(() => {
            this.markedForDeletion = true;
        }, 300);
    }

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
