

class World {
    character = new Character();
    enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    ];
    canvas;
    ctx;
    
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.heigt);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.heigt);

        //draw wird immer wieder aufgerufen.
        let self = this;
        requestAnimationFrame(function() {      // genaaue erklärung in Video 10 Sektion 2 MModul 12!
            self.draw();
        });
    }
}
