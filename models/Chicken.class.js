
class Chicken extends MovableObject {
    y = 380;
    width = 50;
    height = 50;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    damage = 10;
    

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
        this.x = 1400 + Math.random() * 2700; // sorgt dafür das die Hühnchen immer an einer zufälligen stellle auf der xachse zwischen 200 und 700 pixeln erscheinen
        this.speed = 0.02 + Math.random() * 0.30; // sorgt dafür das sich die geschwindigkeit jedes Hühnchens zufällig zwischen 0.03 und 0.28 bewegt
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playDeadAnimation(this.images_dead);
            } else
                this.playAnimation(this.images_walking);
        }, 400);
    }
    
}
