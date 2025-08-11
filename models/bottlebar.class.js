/**
 * Represents the bottle status bar in the game UI.
 * Displays the player's current bottle collection progress using different images.
 * Inherits from the Statusbar class.
 */
class Bottlebar extends Statusbar {
    /**
     * Creates a new Bottlebar instance.
     * Initializes the status bar with a set of images representing different fill levels.
     */
    constructor() {
        const bottleImages = [
            'assets/img/ingame_imgs/7.statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
            'assets/img/ingame_imgs/7.statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
            'assets/img/ingame_imgs/7.statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
            'assets/img/ingame_imgs/7.statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
            'assets/img/ingame_imgs/7.statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
            'assets/img/ingame_imgs/7.statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
        ];
        super(bottleImages, 0);
        this.y = 85;
    }   
}
