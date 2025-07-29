
class Endboss extends MovableObject {

    y = 145;
    width = 280;
    height = 290;

    offset = {
        top: 50,
        left: -10,
        right: 10,
        bottom: 40
    };

    damage = 20;
    
    images_alert = [
        'assets/img/ingame_imgs/4.enemie.boss.chicken/2_alert/G5.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/2_alert/G6.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/2_alert/G7.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/2_alert/G8.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/2_alert/G9.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/2_alert/G10.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/2_alert/G11.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/2_alert/G12.png'
    ];

    images_walking = [
        'assets/img/ingame_imgs/4.enemie.boss.chicken/1_walk/G1.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/1_walk/G2.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/1_walk/G3.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/1_walk/G4.png',

    ];

    images_attack = [
        'assets/img/ingame_imgs/4.enemie.boss.chicken/3_attack/G13.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/3_attack/G14.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/3_attack/G15.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/3_attack/G16.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/3_attack/G17.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/3_attack/G18.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/3_attack/G19.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/3_attack/G20.png'
    ];
    attackMode = false;
    currentImages = this.images_alert;
    world;  

    constructor() {
        super().loadImage('assets/img/ingame_imgs/4.enemie.boss.chicken/2_alert/G5.png')
        this.loadImages(this.images_alert);
        this.loadImages(this.images_attack);
        this.x = 3900;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if ( this.world.camera_x < 3700) {
                this.playAnimation(images_attack);
            } else {
                this.playAnimation(this.currentImages);
            }
        }, 1000 / 10);
    }
}
