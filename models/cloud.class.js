class Cloud extends MovableObject {

    y = 20;
    height = 250;
    width = 500;

    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = x; //= Math.random() * 500; // Zahl zwischen 200 und 700
        this.speed = 0.15
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000/60);
        
    }

}