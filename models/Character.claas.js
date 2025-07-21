class Character extends MovableObject {
    images_walking = [
            'assets/img/ingame_imgs/2.character.pepe/2.walk/W-21.png',
            'assets/img/ingame_imgs/2.character.pepe/2.walk/W-22.png',
            'assets/img/ingame_imgs/2.character.pepe/2.walk/W-23.png',
            'assets/img/ingame_imgs/2.character.pepe/2.walk/W-24.png',
            'assets/img/ingame_imgs/2.character.pepe/2.walk/W-25.png',
            'assets/img/ingame_imgs/2.character.pepe/2.walk/W-26.png'
        ];
        currentImage = 0;

    constructor() {
        super().loadImage('assets/img/ingame_imgs/2.character.pepe/2.walk/W-21.png')
        this.loadImages(this.images_walking);

        this.animate();
    }

    animate() {
        setInterval( () =>{
            let i = this.currentImage % this.images_walking.length; // let i = 7 % 6; => 1, rest 1
            // i = 0, 1, 2, 3, 4 , 5, 0, 1, 2, 3, 4, 5, 0, .....usw.
            let path = this.images_walking[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            }, 1000 / 10);
    }

    jump() {

    }
};