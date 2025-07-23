class SmallChicken extends MovableObject {
    y = 395;
    width = 30;
    height = 30;
    

    images_walking = [
            'assets/img/ingame_imgs/3.enemies.chicken/chicken_small/1_walk/1_w.png',
            'assets/img/ingame_imgs/3.enemies.chicken/chicken_small/1_walk/2_w.png',
            'assets/img/ingame_imgs/3.enemies.chicken/chicken_small/1_walk/3_w.png',
        ];
        

    constructor() {
        super().loadImage('assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.images_walking);
        this.x = 650 + Math.random() * 300; // sorgt dafür das die Hühnchen immer an einer zufälligen stellle auf der xachse zwischen 200 und 700 pixeln erscheinen
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