class DrawableObjects {
    x = 120;
    y = 180;
    img;
    height = 150;
    width = 100;
    currentImage = 0;
    imageCache = {};


    loadImage(path) { // Lade ein Bild in die Welt;
        this.img = new Image();   // img von oben enthält den Wert "new Image()". das glecih wie z. this.img = document.getEmelentById('Image') <img id="image">, nur wir fügen es in unsere world.class später ein statt mit HTML.
        this.img.src = path; // wir geben dem image die Quelle der image datei hier: "img/2_character_pepe/2_walk/W-21.png"
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

        /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/Image22.png', ...]
     */

    loadImages(arr) {    // Lade eine mehrer Bilder einer Bewegung in ein JSON namens imageCache
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawFrame(ctx){
        if (this.canDrawFrame()) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    canDrawFrame(){
        return this instanceof Character || 
        this instanceof Chicken
    }
}