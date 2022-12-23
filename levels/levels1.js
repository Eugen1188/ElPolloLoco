let level1;

function initLevel() {

    level1 = new Level(
        createEnemies(),
        createClouds(),
        createBackgrounds(),
        createCoins(),
        createBottles()
    );
}


function createEnemies() {
    return [
        new Chicken(400),
        new Chicken(800),
        new Chicken(1000),
        new Chicken(1300),
        new Chicken(1500),
        new Chicken(1700),
        new Endboss(400)
    ];
}

function createClouds() {
    return [
        new Cloud(500),
        new Cloud(1000),
        new Cloud(2000)
    ];
}

function createBackgrounds() {
    return [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/air.png', 1438),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1438),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1438),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1438),
        new BackgroundObject('img/5_background/layers/air.png', 2157),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 2157),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 2157),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 2157)
    ];
}

function createCoins() {
    return [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ];
}

function createBottles() {
    return [
        new Bottle(500),
        new Bottle(700),
        new Bottle(1500),
        new Bottle(1800),
        new Bottle(2200)
    ];
}