
class Coin extends MovableObject {
    y = 330;
    width = 150;
    height = 150;

    offset = {
        top: 55,
        left: 55,
        right: 55,
        bottom: 55
    };

    constructor() {
        super();
        this.loadImage('assets/img/ingame_imgs/8.coin/coin_1.png');
        this.x = 500 + Math.random() * 2800;
    }
}
