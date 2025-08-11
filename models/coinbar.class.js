/**
 * Represents the coin status bar in the game UI.
 * Displays the player's current coin collection progress using different images.
 * Inherits from the Statusbar class.
 */
class Coinbar extends Statusbar {

    /**
     * Creates a new Coinbar instance.
     * Initializes the status bar with a set of images representing different coin levels.
     */
    constructor() {
        const coinImages = [
            'assets/img/ingame_imgs/7.statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
            'assets/img/ingame_imgs/7.statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
            'assets/img/ingame_imgs/7.statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
            'assets/img/ingame_imgs/7.statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
            'assets/img/ingame_imgs/7.statusbars/1_statusbar/1_statusbar_coin/green/80.png',
            'assets/img/ingame_imgs/7.statusbars/1_statusbar/1_statusbar_coin/green/100.png',
        ];
        super(coinImages, 0);
        this.y = 40;
    }  
}
