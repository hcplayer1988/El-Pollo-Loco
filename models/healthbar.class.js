/**
 * Represents the health status bar for the player character.
 * Inherits from the Statusbar class and initializes with specific health images.
 */
class Healthbar extends Statusbar {
    
    /**
     * Creates an instance of Healthbar with predefined health images and full energy.
     */
    constructor() {
        const healthImages = [
            'assets/img/ingame_imgs/7.statusbars/1_statusbar/2_statusbar_health/orange/0.png',
            'assets/img/ingame_imgs/7.statusbars/1_statusbar/2_statusbar_health/orange/20.png',
            'assets/img/ingame_imgs/7.statusbars/1_statusbar/2_statusbar_health/blue/40.png',
            'assets/img/ingame_imgs/7.statusbars/1_statusbar/2_statusbar_health/blue/60.png',
            'assets/img/ingame_imgs/7.statusbars/1_statusbar/2_statusbar_health/green/80.png',
            'assets/img/ingame_imgs/7.statusbars/1_statusbar/2_statusbar_health/green/100.png',
        ];
        super(healthImages, 100);
    }
}
