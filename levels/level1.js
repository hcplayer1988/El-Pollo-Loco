
let level1;
function initLevel() {

    level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
    ],
    
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ],

    // [
    //     new ThrowableObject(),
    //     new ThrowableObject(),
    //     new ThrowableObject(),
    // ],

    [
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/air.png', -719),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/3_third_layer/2.png', -719),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/2_second_layer/2.png', -719),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/1_first_layer/2.png', -719),

        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/air.png', 0),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/3_third_layer/1.png', 0),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/2_second_layer/1.png', 0),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/1_first_layer/1.png', 0),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/air.png', 719),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/3_third_layer/2.png', 719),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/2_second_layer/2.png', 719),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/1_first_layer/2.png', 719),

        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/air.png', 719*2),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/3_third_layer/1.png', 719*2),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/2_second_layer/1.png', 719*2),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/1_first_layer/1.png', 719*2),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/air.png', 719*3),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/3_third_layer/2.png', 719*3),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/2_second_layer/2.png', 719*3),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/1_first_layer/2.png', 719*3),

        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/air.png', 719*4),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/3_third_layer/1.png', 719*4),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/2_second_layer/1.png', 719*4),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/1_first_layer/1.png', 719*4),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/air.png', 719*5),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/3_third_layer/2.png', 719*5),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/2_second_layer/2.png', 719*5),
        new  BackgroundObject('assets/img/ingame_imgs/5.background/layers/1_first_layer/2.png', 719*5),
    ]

);

}
