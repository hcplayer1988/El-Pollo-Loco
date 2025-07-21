class Chicken extends MovableObject {
    y = 385;
    width = 30;
    height = 40;
    

    images_walking = [
            'assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/1_w.png',
            'assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/2_w.png',
            'assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/3_w.png',
        ];
        

    constructor() {
        super().loadImage('assets/img/ingame_imgs/3.enemies.chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.images_walking);
        this.x = 200 + Math.random() * 500; // sorgt dafür das die Hühnchen immer an einer zufälligen stellle auf der xachse zwischen 200 und 700 pixeln erscheinen
        
        this.speed = 0.03 + Math.random() * 0.20; // sorgt dafür das sich die geschwindigkeit jedes Hühnchens zufällig zwischen 0.03 und 0.28 bewegt
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval( () =>{
            let i = this.currentImage % this.images_walking.length; // let i = 7 % 6; => 1, rest 1
            // i = 0, 1, 2, 3, 4 , 5, 0, 1, 2, 3, 4, 5, 0, .....usw.
            let path = this.images_walking[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            }, 1000 / 10);
    }
    
}