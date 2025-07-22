class Endboss extends MovableObject {

    y = 145;
    width = 280;
    height = 290;
    

    images_walking = [
            'assets/img/ingame_imgs/4.enemie.boss.chicken/2_alert/G5.png',
            'assets/img/ingame_imgs/4.enemie.boss.chicken/2_alert/G6.png',
            'assets/img/ingame_imgs/4.enemie.boss.chicken/2_alert/G7.png',
            'assets/img/ingame_imgs/4.enemie.boss.chicken/2_alert/G8.png',
            'assets/img/ingame_imgs/4.enemie.boss.chicken/2_alert/G9.png',
            'assets/img/ingame_imgs/4.enemie.boss.chicken/2_alert/G10.png',
            'assets/img/ingame_imgs/4.enemie.boss.chicken/2_alert/G11.png',
            'assets/img/ingame_imgs/4.enemie.boss.chicken/2_alert/G12.png'
        ];
        

    constructor() {
        super().loadImage('assets/img/ingame_imgs/4.enemie.boss.chicken/2_alert/G5.png')
        this.loadImages(this.images_walking);
        this.x = 2650;
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval( () =>{
            this.playAnimation(this.images_walking);
        }, 1000 / 10);
    }
}

