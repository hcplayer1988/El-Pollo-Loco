class Bottle extends MovableObject {

    y = 360;
    width = 70;
    height = 70;

    constructor() {
        super();
        this.loadImage('assets/img/ingame_imgs/6.salsa.bottle/2_salsa_bottle_on_ground.png');
        this.x = 500 + Math.random() * 3300;
    }
}