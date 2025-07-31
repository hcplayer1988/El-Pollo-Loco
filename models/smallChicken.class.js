class SmallChicken extends MovableObject {
    y = 395;
    width = 30;
    height = 30;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    damage = 5;
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
        this.x = 650 + Math.random() * 900; // sorgt dafür das die Hühnchen immer an einer zufälligen stellle auf der xachse zwischen 200 und 700 pixeln erscheinen
        this.speed = 0.02 + Math.random() * 0.25; // sorgt dafür das sich die geschwindigkeit jedes Hühnchens zufällig zwischen 0.03 und 0.28 bewegt
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
                this.playAnimation(this.images_walking);
            } else {
                this.img = this.imageCache[this.images_dead[0]]; // oder playDeadAnimation()
            }
        }, 1000 / 20); // läuft konstant & reagiert schnell
    }


    isDead() {
        return this.dead;
    }

    isHitFromAbove(character) {
        return character.y + character.height < this.y + 50 &&
            character.x + character.width > this.x &&
            character.x < this.x + this.width;
    }

    die() {
        this.dead = true;
        this.speed = 0;
        this.loadImages(this.images_dead);
        this.img = this.imageCache[this.images_dead[0]];
        setTimeout(() => {
            this.markedForDeletion = true;
        }, 1000);
    }
    
}
