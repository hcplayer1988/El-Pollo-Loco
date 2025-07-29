class Statusbar extends DrawableObject {

    healthImages = [
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    coinImages = [
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];

    bottleImages = [
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'assets/img/ingame_imgs/7.statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];

    endBossImages = [
        'assets/img/ingame_imgs/7.statusbars/2_statusbar_endboss/orange/orange0.png',
        'assets/img/ingame_imgs/7.statusbars/2_statusbar_endboss/orange/orange20.png',
        'assets/img/ingame_imgs/7.statusbars/2_statusbar_endboss/blue/blue40.png',
        'assets/img/ingame_imgs/7.statusbars/2_statusbar_endboss/blue/blue60.png',
        'assets/img/ingame_imgs/7.statusbars/2_statusbar_endboss/green/green80.png',
        'assets/img/ingame_imgs/7.statusbars/2_statusbar_endboss/green/green100.png',
    ];

    percentage = 100;
    percentageCoin = 0;
    percentageBottle = 0;
    percentageEndboss = 100;

    constructor() {
        super();
        this.loadImages(this.healthImages);
        this.loadImages(this.coinImages);
        this.loadImages(this.bottleImages);
        this.loadImages(this.endBossImages);
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

    setPercentageCoin(percentageCoin) {
        this.percentageCoin = percentageCoin[this.resolveImageCoinIndex()];
        this.img = this.imageCache[path];
    }

    setPercentageBottle(percentageBottle) {
        this.percentageBottle = percentageBottle; // hier musss eine zahl zwischen 0 und 5 ermittelt  werden
        let path = this.healthImages[this.resolveImageBottleIndex()];
        this.img = this.imageCache[path];
    }

    setPercentageEndboss(percentageEndboss) {
        this.percentageEndboss = percentageEndboss; // hier musss eine zahl zwischen 0 und 5 ermittelt  werden
        let path = this.healthImages[this.resolveImageBottleIndex()];
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

    resolveImageCoinIndex() {
         if(this.percentage == 0) {
            return 0;
        } else if (this.percentage > 20) {
            return 1
        } else if (this.percentage > 40) {
            return 2
        } else if (this.percentage > 60) {
            return 3
        } else if (this.percentage > 80) {
            return 4
        } else {
            return 5
        }; 
    }

    resolveImageBottleIndex() {
         if(this.percentage == 0) {
            return 0;
        } else if (this.percentage > 20) {
            return 1
        } else if (this.percentage > 40) {
            return 2
        } else if (this.percentage > 60) {
            return 3
        } else if (this.percentage > 80) {
            return 4
        } else {
            return 5
        }; 
    }

    resolveImagEndbosssIndex() {
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