
class ThrowableObject extends MovableObject {
    images_rotate = [
        'assets/img/ingame_imgs/6.salsa.bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/ingame_imgs/6.salsa.bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/ingame_imgs/6.salsa.bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/ingame_imgs/6.salsa.bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y, otherDirection) {
        super().loadImage('assets/img/ingame_imgs/6.salsa.bottle/bottle_rotation/1_bottle_rotation.png')
        this.loadImages(this.images_rotate);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.otherDirection = otherDirection;
        this.trow();
    }

    trow() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if (this.otherDirection) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 25);
        setInterval(() => {
            this.playAnimation(this.images_rotate);
        }, 1000 / 20);
    }


}
