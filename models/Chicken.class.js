class Chicken extends MovableObject {
    y = 385;
    width = 30;
    height = 40;

    constructor() {
        super().loadImage('assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/1_w.png')

        this.x = 200 + Math.random() *500;
    }
    
}