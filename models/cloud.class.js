class Cloud extends MovableObject {

    y = 20;
    height = 250;
    width = 500;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')

        this.x = Math.random() * 500; // Zahl zwischen 200 und 700
        this.animate();
    }

    animate() {
        setInterval(() => {  //setInterval bewirkt, dass dise Funktiion this.x -= 0.15 oft hintereinander ausgeführt wird mit 1000 / 60 setzen wir die Ausführung auf 60 bzw 60 fps
            this.x -= 0.15;
        }, 1000 / 60);
    }
}