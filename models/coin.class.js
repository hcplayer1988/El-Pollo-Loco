
class Coin extends MovableObject {
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
        this.y = 330 - Math.random() * 250;
        this.defaultX = this.x;
        this.defaultY = this.y;
        this.defaultSpeed = this.speed;
    }
}
