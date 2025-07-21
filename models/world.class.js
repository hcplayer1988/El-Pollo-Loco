class World {
    character = new Character();
    enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    ];
    clouds = [
        new Cloud(),
    ];
    backgroundObjects = [
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/air.png', 0),
        
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/3_third_layer/1.png', 0),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/2_second_layer/1.png', 0),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/1_first_layer/1.png', 0)
        
    ];
    canvas;
    ctx;
    
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
          

        //draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {      // genaue erklärung in Video 10 Sektion 2 MModul 12!
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj)
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}

/* Diese forEach sschleifen werden durch die Funktion addObjectsToMap() ersetzt!!
        this.enemies.forEach(enemy => {
            this.addToMap(enemy)
        });

        this.clouds.forEach(cloud => {
            this.addToMap(cloud)
        });

         this.backgroundObjects.forEach(bgo => {
            this.addToMap(bgo)
        });
*/