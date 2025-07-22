class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        
        this.ctx.translate(-this.camera_x, 0);

        //draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {      // genaue erklärung in Video 10 Sektion 2 Modul 12!
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj)
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
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