class ThrowableObjects extends MovableObject {

    IMG_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMG_BOTTLE);
        this.x = x;
        this.y = y;
        this.height = 100
        this.width = 100;
        this.throw();
    }

    throw(x, y) {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.playAnimation(this.IMG_BOTTLE)
            this.x += 20;
        }, 50);
    }

    offset = {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10
    }

}