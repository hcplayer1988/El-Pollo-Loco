class Statusbar extends DrawableObject {

    healthImages = [
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.healthImages);
        this.x = 20;
        this.y = 0;
        this.height = 50;
        this.width = 200;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // hier musss eine zahl zwischen 0 und 5 ermittelt  werden
        let path = this.healthImages[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if(this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4
        } else if (this.percentage > 60) {
            return 3
        } else if (this.percentage > 40) {
            return 2
        } else if (this.percentage > 20) {
            return 1
        } else {
            return 0
        }; 
    }
}