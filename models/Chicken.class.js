class Chicken extends MovableObject {
    constructor() {
        super().loadImage('assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/1_w.png')

        this.x = 200 + Math.random() *500;
        this.width = 40;
        this.height = 50;
        this.y = 400;
    }
    
}