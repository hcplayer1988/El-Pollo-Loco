
class SmallChicken extends MovableObject {
    y = 392;
    width = 30;
    height = 30;

    offset = {
        top: 1,
        left: 3,
        right: 3,
        bottom: 0
    };

    damage = 2;
    dead = false;
    markedForDeletion = false;
    

    images_walking = [
        'assets/img/ingame_imgs/3.enemies.chicken/chicken_small/1_walk/1_w.png',
        'assets/img/ingame_imgs/3.enemies.chicken/chicken_small/1_walk/2_w.png',
        'assets/img/ingame_imgs/3.enemies.chicken/chicken_small/1_walk/3_w.png',
    ];
    
    images_dead = [
        'assets/img/ingame_imgs/3.enemies.chicken/chicken_small/2_dead/dead.png'
    ];
        

    constructor() {
        super().loadImage('assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.images_walking);
        this.x = 650 + Math.random() * 900; 
        this.speed = 0.02 + Math.random() * 0.25; 
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
        }, 1000 / 20); 
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
            characterBottom < chickenTop + 32 && // Toleranzbereich
            character.y < this.y &&              // Charakter ist wirklich über dem Huhn
            character.speedY < 0;               // Charakter fällt oder bewegt sich leicht nach unten

        console.log({
            characterBottom,
            chickenTop,
            speedY: character.speedY,
            horizontalOverlap,
            verticalHit,
            result: horizontalOverlap && verticalHit
        });

        return horizontalOverlap && verticalHit;
    }


    die() {
        this.dead = true;
        this.speed = 0;
        this.loadImages(this.images_dead);
        this.img = this.imageCache[this.images_dead[0]];
        setTimeout(() => {
            this.markedForDeletion = true;
        }, 300);
    }

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
