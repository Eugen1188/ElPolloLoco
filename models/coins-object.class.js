class Coin extends MovableObject{

    constructor(){
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 220 + Math.random() * 2500;
        this.y = 200;
        this.height = 100;
        this.width = 100;
    }


    offset = {
        top: 25,
        bottom: 25,
        right: 25,
        left: 25
    }
}