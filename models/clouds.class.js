class Cloud extends MovableObject{
    y = 20;
    width = 500;
    height = 350;

    constructor() {
        super().loadImage('assets/img/ingame_imgs/5.background/layers/4_clouds/1.png')
        this.x = Math.random() * 500; // zufallszahl zwischen 0 und 500
        this.animate();
    };

    animate() {
        setInterval( () =>{
            this.x -= 0.07;
        }, 1000 / 180); 
    }

}