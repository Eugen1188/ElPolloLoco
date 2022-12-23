class StatusBarCoin extends DrawableObjects{

    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png'
    ];

    percentageCoin = 0;

    constructor(){

        super().loadImages(this.IMAGES_COINS);
        this.setPercentageCoin(0);
        this.x = 50;
        this.y = 70;
        this.width = 160;
        this.height = 50;
    }

    setPercentageCoin(percentageCoin){
        this.percentageCoin = percentageCoin;
        let path = this.IMAGES_COINS[this.resolveImageIndexCoin()];
        this.img = this.imageCache[path];
    }

    resolveImageIndexCoin(){
        if(this.percentageCoin == 100){
            return 0;
        }else if(this.percentageCoin == 80){
            return 1;
        }else if(this.percentageCoin == 60){
            return 2;
        }else if(this.percentageCoin == 40){
            return 3;
        }else if(this.percentageCoin == 20){
            return 4;
        }else{
            return 5;
        }
    }

}