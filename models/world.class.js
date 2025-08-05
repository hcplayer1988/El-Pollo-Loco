
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
        }, 1000 / 60); 
    }

    checkThrowObjects() {
        if (!this.level || !this.gameStarted) return;
        let canThrow = this.keyboard.space_shoot &&
                        !this.throwCooldown &&
                        this.bottlesCollected > 0;
        if (!canThrow) return;
        let bottle = this.createBottle();
        this.throwBottle(bottle);
        this.activateThrowCooldown();
    }

    createBottle() {
        let offsetX = this.character.otherDirection ? -40 : 40;
        return new ThrowableObject(
            this.character.x + offsetX,
            this.character.y + 50,
            this.character.otherDirection
        );
    }

    throwBottle(bottle) {
        this.throwableObjects.push(bottle);
        this.bottlesCollected--;
        this.bottleBar.setPercentage(this.bottlesCollected * 20);
    }

    activateThrowCooldown() {
        this.throwCooldown = true;
        setTimeout(() => this.throwCooldown = false, 300);
    }

    checkCollisions() {
        if (!this.level || !this.gameStarted) return;
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkEnemyCollisions();
            this.cleanupEnemies();
            this.checkBottleHitsEnemies();
    }

    checkBottleHitsEnemies() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach(enemy => {
                if (this.shouldBottleHit(bottle, enemy)) {
                    this.handleBottleHit(enemy);
                    this.removeBottle(bottleIndex);
                }
            });
        });
    }

    shouldBottleHit(bottle, enemy) {
        return bottle.isColliding(enemy) && !enemy.isDead();
    }

    handleBottleHit(enemy) {
        if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
            enemy.energy = 0;
            enemy.markedForDeletion = true;
            console.log(`💥 ${enemy.constructor.name} durch Flasche getötet`);
        } else if (enemy instanceof Endboss) {
            enemy.hit(20);
            this.endbossBar.setPercentage(enemy.energy);
            console.log(`🔥 Endboss getroffen! Energie: ${enemy.energy}`);
        }
    }

    removeBottle(index) {
        this.throwableObjects.splice(index, 1);
    }

    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.coinBar.setPercentage(this.coinBar.percentage + 20);
            }
        });
    }

    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                console.log('Bottle eingesammelt!');
                this.level.bottles.splice(index, 1);
                this.bottlesCollected++;
                this.bottleBar.setPercentage(this.bottleBar.percentage + 20);
            }
        });
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach(enemy => {
            if (!this.character.isColliding(enemy)) return;

            console.log('Kollision erkannt mit:', enemy.constructor.name);

            if (enemy.isDead()) {
                console.log('☠️ Gegner ist bereits tot → keine Aktion');
                return;
            }

            this.enemyCollision(enemy);
        });
    }

    enemyCollision(enemy) {
        if (enemy instanceof SmallChicken || enemy instanceof Chicken) {
            this.chickenCollision(enemy);
        } else {
            console.log('Kollision mit anderem Gegner → Character nimmt Schaden');
            this.damageCharacter();
        }
    }

    chickenCollision(chicken) {
        if (chicken.isHitFromAbove(this.character)) {
            chicken.die();
        } else {
            this.damageCharacter();
        }
    }

    damageCharacter() {
        this.character.hit();
        this.healthBar.setPercentage(this.character.energy);
    }

    cleanupEnemies() {
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
            return requestAnimationFrame(() => this.draw());
        }
        this.ctx.translate(this.camera_x, 0);
        this.drawBackground();
        this.drawMovableObjects();
        this.drawCharacterAndEnemies();
        this.checkEndbossCamera();
        this.ctx.translate(-this.camera_x, 0);
        this.drawBars();
        requestAnimationFrame(() => this.draw());
    }

    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    drawMovableObjects() {
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
    }

    drawCharacterAndEnemies() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
    }

    drawBars() {
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossBar);
    }

    checkEndbossCamera() {
        if (this.level.endboss) {
            this.level.endboss.checkCameraPosition(this.camera_x, 3200);
        }
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

