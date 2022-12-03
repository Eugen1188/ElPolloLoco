class Bottle extends MovableObject {

    constructor(x){
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.x = x;
        this.y = 350;
        this.height = 80;
        this.width = 80;
    }

    offset = {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10
    }
}