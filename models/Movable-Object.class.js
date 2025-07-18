class MovableObject {
    x = 120;
    y = 300;
    img;
    heigt = 150;
    width = 80;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');  
    }

    moveLeft() {

    };
};

