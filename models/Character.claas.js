class Character extends MovableObject {
    images_walking = [
            'assets/img/ingame_imgs/2.character.pepe/2.walk/W-21.png',
            'assets/img/ingame_imgs/2.character.pepe/2.walk/W-22.png',
            'assets/img/ingame_imgs/2.character.pepe/2.walk/W-23.png',
            'assets/img/ingame_imgs/2.character.pepe/2.walk/W-24.png',
            'assets/img/ingame_imgs/2.character.pepe/2.walk/W-25.png',
            'assets/img/ingame_imgs/2.character.pepe/2.walk/W-26.png'
        ];
        images_jump = [
            'assets/img/ingame_imgs/2.character.pepe/3.jump/J-31.png',
            'assets/img/ingame_imgs/2.character.pepe/3.jump/J-32.png',
            'assets/img/ingame_imgs/2.character.pepe/3.jump/J-33.png',
            'assets/img/ingame_imgs/2.character.pepe/3.jump/J-34.png',
            'assets/img/ingame_imgs/2.character.pepe/3.jump/J-35.png',
            'assets/img/ingame_imgs/2.character.pepe/3.jump/J-36.png',
            'assets/img/ingame_imgs/2.character.pepe/3.jump/J-37.png',
            'assets/img/ingame_imgs/2.character.pepe/3.jump/J-38.png',
            'assets/img/ingame_imgs/2.character.pepe/3.jump/J-39.png'

        ];
        currentImage = 0;
        world;
        speed = 8;

    constructor() {
        super().loadImage('assets/img/ingame_imgs/2.character.pepe/2.walk/W-21.png')
        this.loadImages(this.images_walking);

        this.animate();
    }

    animate() {
        setInterval( () => {
            if (this.world.keyboard.d_right && this.x < this.world.level.level_end_x) {
                this.x += this.speed;

                this.otherDirection = false;
            }
            if (this.world.keyboard.a_left && this.x > -200) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x +100;
        }, 1000 / 60);

        setInterval( () => {

            if (this.world.keyboard.d_right || this.world.keyboard.a_left) {
                // walk animation
                this.playAnimation(this.images_walking);
            }
        }, 1000 / 25);
    }

    
    jump() {

    }
}
