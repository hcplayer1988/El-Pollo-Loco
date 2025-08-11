
/** @type {HTMLCanvasElement} */
let canvas;

/** @type {World} */
let world;

/** @type {Keyboard} */
let keyboard = new Keyboard();

/** @type {boolean} */
let soundToggleInitialized = false;

/**
 * Initializes the game environment including canvas, world, buttons, and sound settings.
 */
function init() {
    setupCanvas();
    createWorld();
    setupStartButton();
    setupRestartButton();
    setupInfoButton();
    setupPauseButton();
    soundhub.updateSoundToggleIcon();
    keyboard.bindBtsPresssEvents();
}

/**
 * Handles the game start logic when the start button is clicked.
 * @param {HTMLButtonElement} button - The start button element
 */
function handleGameStart(button) {
    if (!world.gameStarted) {
        world.gameStarted = true;
        initLevel();
        world.level = level1;
        world.character.animate();
        world.background_sound.loop = true;
        world.background_sound.play();
        world.character.lastActionTime = Date.now();
        button.style.display = 'none';
        document.getElementById('infoButton').style.display = 'inline-block';
        document.getElementById('restartButton').style.display = 'inline-block';
        world.draw();
    }
}

/**
 * Toggles fullscreen mode on or off.
 */
function fullscreen() {
    let fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
    if (fullscreenElement) {
        exitFullscreen();
    } else {
        let fullscreen = document.getElementById('fullScreen');
        enterFullscreen(fullscreen);
    }
}

/**
 * Requests fullscreen mode for a given element.
 * @param {HTMLElement} element - The element to display in fullscreen
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Sets up the start button and its click behavior.
 */
function setupStartButton() {
    let startButton = document.getElementById('startButton');
    if (!world?.gameStarted) {
        startButton.style.display = 'block';
        startButton.onclick = () => handleGameStart(startButton);
    } else {
        startButton.style.display = 'none';
    }
}

/**
 * Creates a new game world instance.
 */
function createWorld() {
    world = new World(canvas, keyboard);
}

/**
 * Initializes the canvas element.
 */
function setupCanvas() {
    canvas = document.getElementById('canvas');
}

/**
 * Resets the game state and restarts the game.
 */
function resetGame() {
    stopCurrentGame();       
    resetKeyboard();         
    createWorld();           
    initLevel()              
    world.resetAllObjects(); 
    setupStartButton();
    document.getElementById('infoButton').style.display = 'none';
    document.getElementById('restartButton').style.display = 'none';
}

/**
 * Sets up the restart button and its click behavior.
 */
function setupRestartButton() {
    let restartButton = document.getElementById('restartButton');
    restartButton.onclick = () => {
        resetGame();
    };
}

/**
 * Stops the current game and clears the canvas.
 */
function stopCurrentGame() {
    if (world?.stopGame) {
        world.stopGame();
    }

    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    world = null;
}

/**
 * Resets all keyboard input states.
 */
function resetKeyboard() {
    keyboard.d_right = false;
    keyboard.a_left = false;
    keyboard.w_jump = false;
    keyboard.s_down = false;
    keyboard.space_shoot = false;
}

/**
 * Sets up the info button and its overlay behavior.
 */
function setupInfoButton() {
    let infoButton = document.getElementById('infoButton');
    let overlay = document.getElementById('infoOverlay');
    let closeButton = document.getElementById('closeInfoButton');

    infoButton.onclick = () => {
        if (world?.gameStarted) {
            world.togglePause();
            overlay.classList.remove('hidden');
        }
    };
    closeButton.onclick = () => {
        overlay.classList.add('hidden');
        if (world?.gameStarted) {
            setTimeout(() => {
                world.togglePause();
            }, 1000);
        }
    };
}

/**
 * Sets up the pause button and toggles game pause state.
 */
function setupPauseButton() {
    let pauseButton = document.getElementById('pauseButton');
    pauseButton.innerText = '⏸️';
    pauseButton.onclick = () => {
        if (world?.gameStarted) {
            world.togglePause();
            pauseButton.innerText = world.gameStopped ? '▶️' : '⏸️';
        }
    };
}

/**
 * Initializes the sound toggle button once.
 */
function setupSoundToggle() {
    if (soundToggleInitialized) return;
    soundToggleInitialized = true;

    let icon = document.getElementById('soundToggleIcon');
    if (icon) {
        icon.addEventListener('click', () => {
            soundhub.toggleMute();
        });
    } else {
        console.warn('soundToggleIcon not found in DOM');
    }
}

/**
 * Handles keydown events and sets corresponding keyboard flags to true.
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 68) {
            keyboard.d_right = true;
    }    
    if (e.keyCode == 65) {
            keyboard.a_left = true;
    }
        if (e.keyCode == 87) {
            keyboard.w_jump = true;
    }
        if (e.keyCode ==83) {
            keyboard.s_down = true;
    }
        if (e.keyCode == 32) {
            e.preventDefault();
            keyboard.space_shoot = true;
    }
    
});

/**
 * Handles keyup events and sets corresponding keyboard flags to false.
 */
window.addEventListener("keyup", (a) => {
        if (a.keyCode == 68) {
            keyboard.d_right = false;
    }    
        if (a.keyCode == 65) {
            keyboard.a_left = false;
    }
        if (a.keyCode == 87) {
            keyboard.w_jump = false;
    }
        if (a.keyCode ==83) {
            keyboard.s_down = false;
    }
        if (a.keyCode == 32) {
            keyboard.space_shoot = false;
    } 
});

/**
 * Initializes SoundHub and connects UI elements after page load.
 */
window.addEventListener('DOMContentLoaded', () => { 
    window.soundhub = new SoundHub();
    let slider = document.getElementById('volumeSlider');
    if (slider) {
        slider.value = soundhub.volume;
        slider.addEventListener('input', (e) => {
            soundhub.setVolume(e.target.value);
        });
    }
    let icon = document.getElementById('soundToggleIcon');
    if (icon) {
        icon.addEventListener('click', () => {
            soundhub.toggleMute();
        });
    }
    init();
});
