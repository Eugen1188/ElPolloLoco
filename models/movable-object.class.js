class MovableObject {
    x = 120;
    y = 180;
    img;
    height = 150;
    width = 100;
    speed = 10;
    currentImage = 0;
    imageCache = {};
    otherDirection = false;
    speedY = 0
    acceleration = 2.5;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 180;
    }

    loadImage(path) { // Lade ein Bild in die Welt;
        this.img = new Image();   // img von oben enthält den Wert "new Image()". das glecih wie z. this.img = document.getEmelentById('Image') <img id="image">, nur wir fügen es in unsere world.class später ein statt mit HTML.
        this.img.src = path; // wir geben dem image die Quelle der image datei hier: "img/2_character_pepe/2_walk/W-21.png"
    }


    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // character.isColliding(chicken); z.B
    isColliding(mo){
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    drawFrame(ctx){
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }

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

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 7 % 6; => 1, Rest 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 25;
    }
}