
let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    setupCanvas();
    createWorld();
    setupStartButton();
    setupRestartButton();
}

function handleGameStart(button) {
    if (!world.gameStarted) {
        world.gameStarted = true;
        initLevel();
        world.level = level1;
        world.background_sound.loop = true;
        world.background_sound.play();
        world.character.lastActionTime = Date.now();
        button.style.display = 'none';
        world.draw(); // ⏱️ Starte die Animationsschleife neu!
    }
}

function setupStartButton() {
    let startButton = document.getElementById('startButton');
    startButton.style.display = 'block';

    startButton.onclick = () => handleGameStart(startButton);
}

function createWorld() {
    world = new World(canvas, keyboard);
}

function setupCanvas() {
    canvas = document.getElementById('canvas');
}

function restartGame() {
    location.reload(); // So wird wirklich alles zurückgesetzt!
}

function setupRestartButton() {
    let restartButton = document.getElementById('restartButton');
    restartButton.onclick = () => {
        restartGame();
    };
}

function stopCurrentGame() {
    if (world?.background_sound) {
        world.background_sound.pause();
        world.background_sound.currentTime = 0;
    }
    if (world?.stopAnimation) {
        world.stopAnimation(); // Falls du eine eigene Funktion zum Stoppen der Loop hast
    }
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    world = null; // Welt-Referenz löschen
}

function resetKeyboard() {
    keyboard.d_right = false;
    keyboard.a_left = false;
    keyboard.w_jump = false;
    keyboard.s_down = false;
    keyboard.space_shoot = false;
}

// der trigger für die Pfeiltasten funktionierrt nur mit "keydown"!!! Das funktioniert aber auch mit allen anderen Tasten!!
// Tastentrigger auf true
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

// Tastentrigger auf false
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
            //e.preventDefault();
            keyboard.space_shoot = false;
    } 
});
