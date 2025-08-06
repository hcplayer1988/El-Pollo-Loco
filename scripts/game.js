
let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    canvas.addEventListener('click', () => {
        if (!world.gameStarted) {
            world.gameStarted = true;
            initLevel();
            world.level = level1;
            world.background_sound.loop = true;
            world.background_sound.play();
            world.character.lastActionTime = Date.now();
        }
    });
};

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
