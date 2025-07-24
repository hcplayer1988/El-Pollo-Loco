class Chicken extends MovableObject {
    y = 380;
    width = 50;
    height = 50;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    damage = 10;
    

    images_walking = [
            'assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/1_w.png',
            'assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/2_w.png',
            'assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/3_w.png',

        ];
        

    constructor() {
        super().loadImage('assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.images_walking);
        this.x = 950 + Math.random() * 1500; // sorgt dafür das die Hühnchen immer an einer zufälligen stellle auf der xachse zwischen 200 und 700 pixeln erscheinen
        this.speed = 0.03 + Math.random() * 0.20; // sorgt dafür das sich die geschwindigkeit jedes Hühnchens zufällig zwischen 0.03 und 0.28 bewegt
        this.animate();
    }

    animate() {
        setInterval( () => {
            this.moveLeft();
        }, 1000 / 90);
        
        setInterval( () =>{
            this.playAnimation(this.images_walking);
        }, 1000 / 10);
    }
    
}