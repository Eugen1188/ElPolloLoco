class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    speed = 10;
    currentImage = 0;
    imageCache = {};
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();   // img von oben enthält den Wert "new Image()". das glecih wie z. this.img = document.getEmelentById('Image') <img id="image">, nur wir fügen es in unsere world.class später ein statt mit HTML.
        this.img.src = path; // wir geben dem image die Quelle der image datei hier: "img/2_character_pepe/2_walk/W-21.png"
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/Image22.png', ...]
     */

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        setInterval(() => {  //setInterval bewirkt, dass dise Funktiion this.x -= 0.15 oft hintereinander ausgeführt wird mit 1000 / 60 setzen wir die Ausführung auf 60 bzw 60 fps
            this.x -= this.speed;
        }, 1000 / 60);
    }
}