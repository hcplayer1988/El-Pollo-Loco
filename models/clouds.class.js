class Cloud extends MovableObject{
    y = 20;
    width = 500;
    height = 350;

    constructor() {
        super().loadImage('assets/img/ingame_imgs/5.background/layers/4_clouds/1.png')

        this.x = 0 + Math.random() *300;
    };

}