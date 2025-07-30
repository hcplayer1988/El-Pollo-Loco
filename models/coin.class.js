
class Coin extends MovableObject {
    y = 330;
    width = 150;
    height = 150;

    offset = {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50
    };

    constructor() {
        super();
        this.loadImage('assets/img/ingame_imgs/8.coin/coin_1.png');
        this.x = 500 + Math.random() * 3300;
    }
}
