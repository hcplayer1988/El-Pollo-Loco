class ThrowableObject extends MovableObject {

    // imagesOnGround = [
    //      'assets/img/ingame_imgs/6.salsa.bottle/2_salsa_bottle_on_ground.png'
    // ];


    constructor(x, y) {
        super().loadImage('assets/img/ingame_imgs/6.salsa.bottle/2_salsa_bottle_on_ground.png')
        // this.loadImages(this.imagesOnGround);
        // this.x = 100 + Math.random() * 1500;
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.trow();
    }

    trow() {
        this.speedY = 30;
        this.applyGravity();
        setInterval( () => {
            this.x += 10;
        }, 25);
        
    }
}