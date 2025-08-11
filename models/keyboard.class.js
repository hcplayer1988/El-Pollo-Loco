/**
 * Handles keyboard and touch input for controlling the character.
 * Stores the current state of directional and action keys.
 */
class Keyboard {

    /** @type {boolean} True if the left movement key (A or btnLeft) is pressed */
    a_left = false;
    /** @type {boolean} True if the right movement key (D or btnRight) is pressed */
    d_right = false;
    /** @type {boolean} True if the jump key (W or btnJump) is pressed */
    w_jump = false;
    /** @type {boolean} True if the down key (S) is pressed */
    s_down = false;
    /** @type {boolean} True if the shoot/throw key (Space or btnThrow) is pressed */
    space_shoot = false;

    /**
     * Binds touch event listeners to on-screen buttons for mobile input.
     * Updates the corresponding key states on touchstart and touchend.
     */
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
