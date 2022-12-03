class Chicken extends MovableObject {

    y = 360;
    height = 60;
    width = 60;
    energy = 1;


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.x = x; // Zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.25
        this.animate();
    }

    enemyDead() {
        let path = this.IMAGES_DEAD;
        this.img = this.imageCache[path];
    }

    animate() {
    
            setInterval(() => {
                if(this.energy == 1){
                    this.playAnimation(this.IMAGES_WALKING);
                }

            }, 100);
    
            setInterval(() => {
                if(this.energy == 1){
                    this.moveLeft();
                }

            }, 1000 / 60);
        
    
    }

    offset = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }

}