class MovableObject extends DrawableObjects {

    speed = 5;
    otherDirection = false;
    speedY = 0
    acceleration = 2.5;
    lastHit = 0;
    energy = 100;
    energyEnemies = 1;
    jump_sound = new Audio('audio/jump.mp3')
    gethit_sound = new Audio('audio/getHit.mp3')

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }else if(!this.isAboveGround()){
                this.speedY = 0;        // set speedY to 0 again, because after a jump it is < 0, we need speedY 0 for the "if-condition" when we jump on enemys, we can see when we come from top on the enemy;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObjects)
            return true
        return this.y < 180;
    }

    // character.isColliding(chicken); z.B
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    hit() {
        this.energy -= 20;
        this.gethit_sound.play();
        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 0.7;
    }

    isDead() {
        return this.energy == 0;
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
        this.jump_sound.play()
    }
}