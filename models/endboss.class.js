
class Endboss extends MovableObject {

    y = 145;
    width = 280;
    height = 290;

    offset = {
        top: 40,
        left: 10,
        right: 0,
        bottom: 5
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

    images_hurt = [
        'assets/img/ingame_imgs/4.enemie.boss.chicken/4_hurt/G21.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/4_hurt/G22.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/4_hurt/G23.png'
    ];

    images_dead = [
        'assets/img/ingame_imgs/4.enemie.boss.chicken/5_dead/G24.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/5_dead/G25.png',
        'assets/img/ingame_imgs/4.enemie.boss.chicken/5_dead/G26.png'
    ];

    attackMode = false;
    alertPhaseActive = true;
    currentImages = this.images_alert;
    world;
    isHurt = false;
    energy = 100;


    constructor() {
        super().loadImage('assets/img/ingame_imgs/4.enemie.boss.chicken/2_alert/G5.png')
        this.loadImages(this.images_alert);
        this.loadImages(this.images_walking);
        this.loadImages(this.images_attack);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        this.x = 3980;
        this.speed = 0.5;
        this.world = world;
        this.character = world.character;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.alertTriggered && this.getDistanceToCharacter() < 500) {
                this.alertTriggered = true;
                this.alertPhaseActive = true;
                setTimeout(() => {
                    this.alertPhaseActive = false;
                }, 2000);
            }
            if (!this.isDead() && !this.alertPhaseActive) {
                this.moveLeft();
            }
        }, 1000 / 100);
        setInterval(() => {
            if (!this.isHurt) {
                this.updateState();
            }
            this.playAnimation(this.currentImages);
        }, 200);
    }

    getDistanceToCharacter() {
        return Math.abs(this.x - this.world.character.x);
    }

    updateState() {
        if (this.isDead()) {
            this.currentImages = this.images_dead;
            return;
        }
        if (this.alertPhaseActive) {
            this.attackMode = false;
            this.currentImages = this.images_alert;
            return;
        }
        let closeToCharacter = this.getDistanceToCharacter() < 250;
        let weakened = this.energy <= 50;
        if (closeToCharacter || weakened) {
            this.attackMode = true;
            this.speed = 1.1;
            this.currentImages = this.images_attack;
        } else {
            this.attackMode = false;
            this.speed = 0.3;
            this.currentImages = this.images_walking;
        }
    }

    hit(damage) {
        this.energy = Math.max(this.energy - damage, 0);
        this.isHurt = true;
        this.currentImages = this.images_hurt;

        setTimeout(() => {
            this.isHurt = false;
            this.updateState();
        }, 300);
    }
}

