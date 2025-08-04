
class Bottle extends MovableObject {

    y = 360;
    width = 70;
    height = 70;

    offset = {
        top: 10,
        left: 20,
        right: 20,
        bottom: 6,
    };

    constructor() {
        super();
        this.loadImage('assets/img/ingame_imgs/6.salsa.bottle/2_salsa_bottle_on_ground.png');
        this.x = 500 + Math.random() * 2900;
    }
}
