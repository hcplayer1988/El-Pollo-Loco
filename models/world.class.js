class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new Statusbar();
    throwableObjects = [];
    
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 80);
    }

    checkThrowObjects() {
        if (this.keyboard.space_shoot) {
            let bottle = new  ThrowableObject(this.character.x +40, this.character.y + 50 );
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                //console.log(`Character loses energy. Remaining energie: ${this.character.energy}`);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        // ------- Space for fixed objects -------
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        
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
            this.flipImage(mo);
        }
        
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawHitFrame(this.ctx);
        
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
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