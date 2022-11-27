class StatusBarHealth extends DrawableObjects{

    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    percentageHealth = 100;

    constructor(){
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.setPercentageHealth(100);  
        this.x = 50;
        this.y = 10;
        this.width = 160;
        this.height = 50;
    }


    setPercentageHealth(percentageHealth){
        this.percentageHealth = percentageHealth;  // => 0 ... 5
        let path = this.IMAGES_HEALTH[this.resolveImageIndexHealth()];
        this.img = this.imageCache[path];
    }

    resolveImageIndexHealth(){
        if(this.percentageHealth == 100){
            return 5;
        }else if(this.percentageHealth > 80){
            return 4;
        }else if(this.percentageHealth > 60){
            return 3;
        }else if(this.percentageHealth > 40){
            return 2;
        }else if(this.percentageHealth > 20){
            return 1;
        }else{
            return 0;
        }
    }



}