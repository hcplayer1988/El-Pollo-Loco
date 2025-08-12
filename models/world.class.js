/**
 * Represents the game world, including the character, level, UI elements, sounds, and game logic.
 * Manages rendering, collision detection, object interactions, and game state transitions.
 */
class World {
    /** @type {Character} Main character controlled by the player */
character = new Character();

/** @type {Level} Current level configuration */
level = level1;

/** @type {HTMLCanvasElement} Canvas element used for rendering */
canvas;
/** @type {CanvasRenderingContext2D} 2D rendering context */
ctx;
/** @type {Object} Keyboard input handler */
keyboard;

/** @type {number} Horizontal camera offset */
camera_x = 0;

/** @type {Healthbar|Coinbar|Bottlebar|Endbossbar} UI bars */
healthBar = new Healthbar();
coinBar = new Coinbar();
bottleBar = new Bottlebar();
endbossBar = new Endbossbar();

/** @type {ThrowableObject[]} Bottles currently thrown */
throwableObjects = [];

/** @type {HTMLImageElement} Start, win, and game over images */
startImage = new Image();
youWinImage = new Image();
gameOverImage = new Image();

/** @type {number} Number of bottles collected */
bottlesCollected = 0;

/** @type {HTMLAudioElement} Sounds for bottle throw, coin/bottle collect, background, win, and lose */
throw_bottle_sound = new Audio('audio/throw_bottle.mp3');
collect_coin_sound = new Audio('audio/collect_coin.mp3');
collect_bottle_sound = new Audio('audio/collect_bottle.mp3');
background_sound = new Audio('audio/wildwest-soundtrack-acoustic-guitar-69109.mp3');
winSound = new Audio('audio/game_won.mp3');
looseSound = new Audio('audio/game over.mp3');

/** @type {boolean} Flags for win/lose state and sound playback */
gameWonPlayed = false;
gameWon = false;
gameOver = false;
gameOverPlayed = false;
gameStopped = false;
isPaused = false;
isInfoPaused = false;

/** @type {number} IDs for game loop and animation frame */
intervalId;
animationId;

    /**
     * Initializes the game world with canvas and keyboard input.
     * Loads images, sets up sound, and starts the game loop.
     * @param {HTMLCanvasElement} canvas - The canvas element used for rendering
     * @param {Object} keyboard - The keyboard input handler
     */
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
        soundhub.addSound(this.throw_bottle_sound);
        soundhub.addSound(this.collect_coin_sound);
        soundhub.addSound(this.collect_bottle_sound);
        soundhub.addSound(this.background_sound);
        soundhub.addSound(this.winSound);
        soundhub.addSound(this.looseSound);
        soundhub.setVolume(soundhub.volume);
    }

    /**
     * Links the character to the current world instance.
     */
    setWorld() {
        this.character.world = this;
    }

    togglePause() {
        togglePause(this);
    }

    /**
     * Resets all game objects to their initial state.
     */
    resetAllObjects() {
        if (this.character?.reset) this.character.reset();
        if (this.enemies) this.enemies.forEach(e => e.reset?.());
        if (this.clouds) this.clouds.forEach(c => c.reset?.());
        if (this.coins) this.coins.forEach(c => c.reset?.());
        if (this.bottles) this.bottles.forEach(b => b.reset?.());
    }

    /**
     * Checks if the game has ended due to win or loss conditions.
     * Displays appropriate screen and stops the game if needed.
     * @returns {boolean} True if game has ended, false otherwise
     */
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

    /**
     * Starts the main game loop for collision detection and object throwing.
     */
    run() {
        this.intervalId = setInterval(() => {
            if (this.gameStopped) return;
            this.checkCollisions();
            this.checkThrowObjects();
        }, 1000 / 60);
    }

    /**
     * Checks if the player can throw a bottle and initiates the throw.
     */
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

    /**
     * Creates a new throwable bottle object based on character position and direction.
     * @returns {ThrowableObject} The newly created bottle object
     */
    createBottle() {
        let offsetX = this.character.otherDirection ? -40 : 40;
        return new ThrowableObject(
            this.character.x + offsetX,
            this.character.y + 50,
            this.character.otherDirection
        );
    }

    /**
     * Plays throw sound, adds bottle to world, and updates bottle bar.
     * @param {ThrowableObject} bottle - The bottle object to throw
     */
    throwBottle(bottle) {
        this.throw_bottle_sound.play();
        this.throwableObjects.push(bottle);
        this.bottlesCollected--;
        this.bottleBar.setPercentage(this.bottlesCollected * 20);
    }

    /**
     * Activates a cooldown period to prevent rapid bottle throwing.
     */
    activateThrowCooldown() {
        this.throwCooldown = true;
        setTimeout(() => this.throwCooldown = false, 300);
    }

    /**
     * Checks all relevant collisions in the game world.
     */
    checkCollisions() {
        if (!this.level || !this.gameStarted) return;
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkEnemyCollisions();
            this.cleanupEnemies();
            this.checkBottleHitsEnemies();
    }

    /**
     * Checks if any thrown bottles hit enemies and handles the result.
     */
    checkBottleHitsEnemies() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach(enemy => {
                if (this.shouldBottleHit(bottle, enemy)) {
                    enemy.handleBottleHit(this);
                    this.removeBottle(bottleIndex);
                }
            });
        });
    }

    /**
     * Determines whether a bottle should hit an enemy.
     * @param {ThrowableObject} bottle - The bottle object
     * @param {MovableObject} enemy - The enemy object
     * @returns {boolean} True if bottle hits and enemy is alive
     */
    shouldBottleHit(bottle, enemy) {
        return bottle.isColliding(enemy) && !enemy.isDead();
    }

    /**
     * Removes a bottle from the throwableObjects array.
     * @param {number} index - Index of the bottle to remove
     */
    removeBottle(index) {
        this.throwableObjects.splice(index, 1);
    }

    /**
     * Checks for collisions between the character and coins.
     * Removes collected coins and updates the coin bar.
     */
    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.coinBar.setPercentage(this.coinBar.percentage + 20);
                this.collect_coin_sound.play();
            }
        });
    }

    /**
     * Checks for collisions between the character and bottles.
     * Removes collected bottles and updates the bottle bar.
     */
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

    /**
     * Checks for collisions between the character and enemies.
     * Handles damage or enemy defeat depending on conditions.
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach(enemy => {
            if (!this.character.isColliding(enemy)) return;
            if (enemy.isDead()) {
                return;
            }
            this.enemyCollision(enemy);
        });
    }

    /**
     * Checks for collisions between the character and enemies.
     * Handles damage or enemy defeat depending on conditions.
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach(enemy => {
            if (!this.character.isColliding(enemy)) return;
            if (enemy.isDead()) return;

            enemy.handleCollisionWithCharacter(this.character);
            this.healthBar.setPercentage(this.character.energy);
        });
    }

    /**
     * Removes enemies marked for deletion from the level.
     */
    cleanupEnemies() {
        let before = this.level.enemies.length;
        this.level.enemies = this.level.enemies.filter(e => !e.markedForDeletion);
        let after = this.level.enemies.length;
        if (before !== after) {
        }
    }

    /**
     * Draws the start screen image to the canvas.
     */
    drawStartScreen() {
        this.ctx.drawImage(this.startImage, 0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Main draw loop for rendering the game world.
     * Handles start screen, game end conditions, and paused state.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.gameStarted) {
            this.drawStartScreen();
            return;
        }
        if (this.checkGameEndConditions()) return;
        if (this.gameStopped) return; // No start screen during pause!
        this.drawWorldObjects();
        this.animationId = requestAnimationFrame(() => this.draw());
    }

    /**
     * Draws all visual elements of the game world.
     * Includes background, objects, character, enemies, and UI bars.
     */
    drawWorldObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.drawBackground();
        this.drawMovableObjects();
        this.drawCharacterAndEnemies();
        this.checkEndbossCamera();
        this.ctx.translate(-this.camera_x, 0);
        this.drawBars();
    }

    /**
     * Draws the game over screen and plays the game over sound once.
     */
    drawGameOverScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.gameOverImage, 0, 0, this.canvas.width, this.canvas.height);
        if (!this.gameOverPlayed) {
            this.looseSound.play();
            this.gameOverPlayed = true;
        }
    }

    /**
     * Draws the win screen and plays the win sound once.
     */
    drawWinScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youWinImage, 0, 0, this.canvas.width, this.canvas.height);
        if (!this.gameWonPlayed) {
            this.winSound.play();
            this.gameWonPlayed = true;
        }
    }

    /**
     * Draws background objects and clouds to the canvas.
     */
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * Draws movable objects like coins, bottles, and thrown bottles.
     */
    drawMovableObjects() {
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Draws the character and all enemies to the canvas.
     */
    drawCharacterAndEnemies() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
    }

    /**
     * Draws all UI bars (health, coins, bottles, endboss).
     */
    drawBars() {
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossBar);
    }

    /**
     * Adds multiple drawable objects to the canvas.
     * @param {DrawableObject[]} objects - Array of drawable objects
     */
    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj)
        });
    }

    /**
     * Adds a single drawable object to the canvas, handling direction flipping.
     * @param {DrawableObject} mo - The drawable object
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            mo.flipImage(this.ctx);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawHitFrame(this.ctx);
        if (mo.otherDirection) {
            mo.flipImageBack(this.ctx);
        }
    }

    /**
     * Adjusts camera position if the endboss is present.
     */
    checkEndbossCamera() {
        if (this.level.endboss) {
            this.level.endboss.checkCameraPosition(this.camera_x, 3200);
        }
    }
}