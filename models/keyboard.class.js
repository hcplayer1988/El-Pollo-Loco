
class Keyboard {
    a_left = false;
    d_right = false;
    w_jump = false;
    s_down = false;
    space_shoot = false;

    constructor() {
        
    };

    bindBtsPresssEvents() {
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        this.a_left = true;
        });

        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault(); 
        this.a_left = false;
        });

        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        this.d_right = true;
        });

        document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault(); 
        this.d_right = false;
        });

        document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        this.w_jump = true;
        });

        document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault(); 
        this.w_jump = false;
        });

        document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        this.space_shoot = true;
        });

        document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault(); 
        this.space_shoot = false;
        });
    }
}
