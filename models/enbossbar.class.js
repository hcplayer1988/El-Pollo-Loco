
class Endbossbar extends Statusbar {

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