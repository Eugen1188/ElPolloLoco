class StatusBarBottle extends DrawableObjects{

    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png'
    ]

    percentageBottle = 0;

    constructor(){
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.setPercentageBottle(0);
        this.x = 50;
        this.y = 40;
        this.width = 160;
        this.height = 50;
    }


    setPercentageBottle(percentageBottle){
        this.percentageBottle = percentageBottle;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndexBottle()];
        this.img = this.imageCache[path];
    }

    resolveImageIndexBottle(){
        if(this.percentageBottle == 5){
            return 0;
        }else if(this.percentageBottle == 4){
            return 1;
        }else if(this.percentageBottle == 3){
            return 2;
        }else if(this.percentageBottle == 2){
            return 3;
        }else if(this.percentageBottle == 1){
            return 4;
        }else{
            return 5;
        }
    }

}