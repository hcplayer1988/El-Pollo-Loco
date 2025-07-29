
class Cloud extends MovableObject{
    
    width = 500;
    height = 350;
    

    constructor() {
        super().loadImage('assets/img/ingame_imgs/5.background/layers/4_clouds/1.png')
        this.x = -500 + Math.random() * 3700; // zufallszahl zwischen 0 und 3000
        this.y = Math.random() * 70 + 10;
        this.speed = 0.05 + Math.random() * 0.11;
        this.animate();
    };



    animate() {
        let animateCloud = () => {
            this.moveLeft();

            // Sobald die Wolke aus dem Bild ist → neue Position
            if (this.x + this.width < 0) {
                this.x = 3700 + Math.random() * 20;
                this.speed = 0.05 + Math.random() * 0.11; // frisches Tempo!
            }

            requestAnimationFrame(animateCloud);
        };

        requestAnimationFrame(animateCloud);
}


}
