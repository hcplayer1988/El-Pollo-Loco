class ThrowableObject extends MovableObject {

    imagesOnGround = [
         'assets/img/ingame_imgs/6.salsa.bottle/2_salsa_bottle_on_ground.png'
    ];


    constructor() {
        super().loadImage('assets/img/ingame_imgs/6.salsa.bottle/2_salsa_bottle_on_ground.png')
        // this.loadImages(this.imagesOnGround);
        // this.x = 100 + Math.random() * 1500;
        this.x = 100;
        this.y = 370;
        this.width = 60;
        this.height = 60;
        this.trow(100, 200);
    }

    trow(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 10;
        this.applyGravity();
        setInterval( () => {
            this.x += 25;
        }, 30);
        
    }
    

}