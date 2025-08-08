
let canvas;
let world;
let keyboard = new Keyboard();
let soundToggleInitialized = false;

function init() {
    setupCanvas();
    createWorld();
    setupStartButton();
    setupRestartButton();
    setupInfoButton(); // open the game description
    setupPauseButton();
    soundhub.updateSoundToggleIcon();
    keyboard.bindBtsPresssEvents();
}

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
        world.draw(); // Starte die Animationsschleife neu!
    }
}

function fullscreen() {
    let fullscreen = document.getElementById('fullScreen');
    enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function setupStartButton() {
    let startButton = document.getElementById('startButton');

    // Nur anzeigen, wenn das Spiel noch nicht gestartet wurde
    if (!world?.gameStarted) {
        startButton.style.display = 'block';
        startButton.onclick = () => handleGameStart(startButton);
    } else {
        startButton.style.display = 'none';
    }
}

function createWorld() {
    world = new World(canvas, keyboard);
}

function setupCanvas() {
    canvas = document.getElementById('canvas');
}

function resetGame() {
    stopCurrentGame();       // Stoppt alles
    resetKeyboard();         // Setzt Eingaben zurück
    createWorld();           // Neue Welt erzeugen
    initLevel()              // Level neu laden
    world.resetAllObjects(); // Alle Objekte zurücksetzen
    setupStartButton();      // Startbutton anzeigen
}

function setupRestartButton() {
    let restartButton = document.getElementById('restartButton');
    restartButton.onclick = () => {
        resetGame();
    };
}

function stopCurrentGame() {
    if (world?.stopGame) {
        world.stopGame(); // Nutzt deine modulare Methode!
    }

    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    world = null;
}

function resetKeyboard() {
    keyboard.d_right = false;
    keyboard.a_left = false;
    keyboard.w_jump = false;
    keyboard.s_down = false;
    keyboard.space_shoot = false;
}

function setupInfoButton() {
    let infoButton = document.getElementById('infoButton');
    let overlay = document.getElementById('infoOverlay');
    let closeButton = document.getElementById('closeInfoButton');

    infoButton.onclick = () => {
        if (world?.gameStarted) {
            world.togglePause(); // Einheitliche Pausenlogik
            overlay.classList.remove('hidden');
        }
    };
    closeButton.onclick = () => {
        overlay.classList.add('hidden');
        if (world?.gameStarted) {
            setTimeout(() => {
                world.togglePause(); // Spiel fortsetzen
            }, 1000);
        }
    };
}

function setupPauseButton() {
    let pauseButton = document.getElementById('pauseButton');
    pauseButton.innerText = '⏸️'; // Initiales Symbol
    pauseButton.onclick = () => {
        if (world?.gameStarted) {
            world.togglePause();
            pauseButton.innerText = world.gameStopped ? '▶️' : '⏸️';
        }
    };
}

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
            keyboard.space_shoot = false;
    } 
});

window.addEventListener('DOMContentLoaded', () => {
    // SoundHub erzeugen
    window.soundhub = new SoundHub(); // global verfügbar machen

    // Lautstärke-Slider verbinden
    let slider = document.getElementById('volumeSlider');
    if (slider) {
        //Initialwert aus SoundHub setzen
        slider.value = soundhub.volume;
        slider.addEventListener('input', (e) => {
            soundhub.setVolume(e.target.value);
        });
    }
    // Mute-Icon verbinden
    let icon = document.getElementById('soundToggleIcon');
    if (icon) {
        icon.addEventListener('click', () => {
            soundhub.toggleMute();
        });
    }
    // Jetzt Spiel initialisieren
    init();
});


