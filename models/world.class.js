
class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new Healthbar();
    coinBar = new Coinbar();
    bottleBar = new Bottlebar();
    endbossBar = new Endbossbar();    
    throwableObjects = [];
    startImage = new Image();
    bottlesCollected = 0;
    
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.startImage.src = './assets/img/ingame_imgs/9.intro_outro_screens/start.screen/startscreen.1.png'
        
        this.setWorld();
        this.run();

        this.startImage.onload = () => {
            this.draw();
        }
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 1000 / 60); // 60 FPS
    }

    checkThrowObjects() {
        if (!this.level || !this.gameStarted) return; // check the beginn of the game
        
        if (this.keyboard.space_shoot && !this.throwCooldown && this.bottlesCollected > 0) {
            let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 50);
            this.throwableObjects.push(bottle);
            this.bottlesCollected--;
            this.bottleBar.setPercentage(this.bottlesCollected * 20);

            this.throwCooldown = true; // Sperre aktivieren

            setTimeout(() => {
                this.throwCooldown = false; // Sperre nach 300ms wieder freigeben
            }, 300);
        }

    }

    checkCollisions() {
        if (!this.level || !this.gameStarted) return;

        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.coinBar.setPercentage(this.coinBar.percentage + 20);
            }
        });

        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                console.log('Bottle eingesammelt!');
                this.level.bottles.splice(index, 1); // Bottle entfernen
                this.bottlesCollected++;
                this.bottleBar.setPercentage(this.bottleBar.percentage + 20); // Bottlebar erhöhen
            }
        });

        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                console.log('Kollision erkannt mit:', enemy.constructor.name);

                if (!enemy.isDead()) {
                    if (enemy instanceof SmallChicken || enemy instanceof Chicken) {
                        if (enemy.isHitFromAbove(this.character)) {
                            // Charakter springt von oben auf das Huhn
                            enemy.die();
                        } else {
                            // Charakter trifft das Huhn seitlich
                            this.character.hit();
                            this.healthBar.setPercentage(this.character.energy);
                        }
                    } else {
                        console.log('Kollision mit anderem Gegner → Character nimmt Schaden');
                        this.character.hit();
                        this.healthBar.setPercentage(this.character.energy);
                    }
                } else {
                    console.log('☠️ Gegner ist bereits tot → keine Aktion');
                }
            }
        });

        let before = this.level.enemies.length;
        this.level.enemies = this.level.enemies.filter(e => !e.markedForDeletion);
        let after = this.level.enemies.length;

        if (before !== after) {
            console.log(`${before - after} Gegner entfernt (markedForDeletion)`);
        }
    }

    drawStartScreen() {
        this.ctx.drawImage(this.startImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'black';
        this.ctx.fillText('Klicke zum Starten', this.canvas.width / 2, this.canvas.height - 50);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (!this.gameStarted) {
            this.drawStartScreen();
        } else {
            this.ctx.translate(this.camera_x, 0);
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.clouds);

            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.healthBar);
            this.ctx.translate(this.camera_x, 0);
            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.coinBar);
            this.ctx.translate(this.camera_x, 0);
            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.bottleBar);
            this.ctx.translate(this.camera_x, 0);
            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.endbossBar);
            this.ctx.translate(this.camera_x, 0);

            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.bottles);
            
            this.addToMap(this.character);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.throwableObjects);

            if (this.level.endboss) {
                this.level.endboss.checkCameraPosition(this.camera_x, 3200);
            }
           
            this.ctx.translate(-this.camera_x, 0);
        }
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