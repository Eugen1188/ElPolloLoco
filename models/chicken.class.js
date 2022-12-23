class Chicken extends MovableObject {

    y = 360;
    height = 60;
    width = 60;
    energy = 1;
    defeated = false

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    dead_sound = new Audio('audio/death_chicken.mp3')

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.x = x; // Zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.25
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.energy == 1) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
        setInterval(() => {
            if (this.energy == 1) {
                this.moveLeft();
            }
            this.checkForDeadEnemy();
        }, 1000 / 60);

    }
    
    checkForDeadEnemy() {
        if (this.isDead() && !this.defeated) {
            let path = this.IMAGES_DEAD;
            this.img = this.imageCache[path];
            this.dead_sound.play();
            this.defeated = true; // set defeated to true again, because the sound repeats.
        }
    }

    offset = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }

}