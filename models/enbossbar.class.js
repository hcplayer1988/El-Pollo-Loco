/**
 * Represents the status bar for the endboss character.
 * Inherits from the Statusbar class and initializes with specific images.
 */
class Endbossbar extends Statusbar {

    /**
     * Creates an instance of Endbossbar with predefined images and position.
     */
    constructor() {
        const endbossImages = [
            'assets/img/ingame_imgs/7.statusbars/2_statusbar_endboss/orange/orange0.png',
            'assets/img/ingame_imgs/7.statusbars/2_statusbar_endboss/orange/orange20.png',
            'assets/img/ingame_imgs/7.statusbars/2_statusbar_endboss/blue/blue40.png',
            'assets/img/ingame_imgs/7.statusbars/2_statusbar_endboss/blue/blue60.png',
            'assets/img/ingame_imgs/7.statusbars/2_statusbar_endboss/green/green80.png',
            'assets/img/ingame_imgs/7.statusbars/2_statusbar_endboss/green/green100.png',
        ];
        super(endbossImages, 100);
        this.x = 490;
    }  
}
