
class Healthbar extends Statusbar {
    
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
