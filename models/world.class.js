
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
    youWinImage = new Image();
    gameOverImage = new Image();
    bottlesCollected = 0;
    throw_bottle_sound = new Audio('audio/throw_bottle.mp3');
    collect_coin_sound = new Audio('audio/collect_coin.mp3');
    collect_bottle_sound = new Audio('audio/collect_bottle.mp3');
    background_sound = new Audio('audio/wildwest-soundtrack-acoustic-guitar-69109.mp3');
    winSound = new Audio('audio/game_won.mp3');
    looseSound = new Audio('audio/game over.mp3');
    gameWonPlayed = false;
    gameWon = false;
    gameOver = false;
    gameOverPlayed = false;
    gameStopped = false;
    intervalId;
    animationId;
    isPaused = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.startImage.src = './assets/img/ingame_imgs/9.intro_outro_screens/start.screen/startscreen.1.png'
        this.youWinImage.src = 'assets/img/ingame_imgs/You won, you lost/you_win_a.png'
        this.gameOverImage.src = 'assets/img/ingame_imgs/You won, you lost/game_over A.png'
        this.setWorld();
        this.run();
        this.startImage.onload = () => {
            this.draw();
        }
    }

    setWorld() {
        this.character.world = this;
    }

    pauseGame() {
        this.isPaused = true;
    }

    resumeGame() {
        this.isPaused = false;
    }

    checkGameEndConditions() {
        if (this.gameStarted && this.character.isDead()) {
            this.drawGameOverScreen();
            this.stopGame();
            return true;
        }
        if (this.gameWon) {
            this.drawWinScreen();
            this.stopGame();
            return true;
        }
        return false;
    }

    run() {
        this.intervalId = setInterval(() => {
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
        this.throw_bottle_sound.play();
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
            enemy.die();
        } else if (enemy instanceof Endboss) {
            if (!enemy.isDead()) {
                enemy.hit(16.67);
                this.endbossBar.setPercentage(enemy.energy);
                if (enemy.energy <= 0) {
                    enemy.die();
                }
            }
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
                this.collect_coin_sound.play();
            }
        });
    }

    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.bottlesCollected++;
                this.bottleBar.setPercentage(this.bottleBar.percentage + 12.5);
                this.collect_bottle_sound.play();
            }
        });
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach(enemy => {
            if (!this.character.isColliding(enemy)) return;
            if (enemy.isDead()) {
                return;
            }
            this.enemyCollision(enemy);
        });
    }

    enemyCollision(enemy) {
        if (enemy instanceof SmallChicken || enemy instanceof Chicken) {
            this.chickenCollision(enemy);
        } else {
            this.damageCharacter(enemy);
        }
    }

    chickenCollision(chicken) {
        if (chicken.isHitFromAbove(this.character)) {
            chicken.die();
        } else {
            this.damageCharacter(chicken);
        }
    }

    damageCharacter(enemy) {
        this.character.hit(enemy.damage);
        this.healthBar.setPercentage(this.character.energy);
    }

    cleanupEnemies() {
        let before = this.level.enemies.length;
        this.level.enemies = this.level.enemies.filter(e => !e.markedForDeletion);
        let after = this.level.enemies.length;
        if (before !== after) {
        }
    }

    drawStartScreen() {
        this.ctx.drawImage(this.startImage, 0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.gameStarted || this.gameStopped) {
            this.drawStartScreen();
            return; // Abbruch des Loops
        }
        if (this.checkGameEndConditions()) return;
        this.drawWorldObjects();
        this.animationId = requestAnimationFrame(() => this.draw());
    }

    drawWorldObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.drawBackground();
        this.drawMovableObjects();
        this.drawCharacterAndEnemies();
        this.checkEndbossCamera();
        this.ctx.translate(-this.camera_x, 0);
        this.drawBars();
    }

    drawGameOverScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.gameOverImage, 0, 0, this.canvas.width, this.canvas.height);
        if (!this.gameOverPlayed) {
            this.looseSound.play();
            this.gameOverPlayed = true;
        }
    }

    drawWinScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youWinImage, 0, 0, this.canvas.width, this.canvas.height);
        if (!this.gameWonPlayed) {
            this.winSound.play();
            this.gameWonPlayed = true;
        }
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
