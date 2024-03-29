class Character extends MovableObject {

    y = 180;
    height = 250;
    width = 100;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_ISDEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    coins = 0;
    bottles = 0;
    world;
    idleTimer = 0;
    walking_sound = new Audio('audio/walking.mp3');
    gethit_sound = new Audio('audio/getHit.mp3')

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ISDEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.animate();
        this.applyGravity();
    };

    animate() {
        setInterval(() => this.movement(), 1000 / 60);
        setInterval(() => this.animations(), 40);
        setInterval(() => this.increaseIdleTimer(), 500);
        setInterval(() => this.idle(), 200);
    }
 
    movement() {
        this.walking_sound.pause();
        if (this.canMoveRight()) {
            this.moveRight();
        }
        if (this.canMoveLeft()) {
            this.moveLeft();
        }
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            this.idleTimer = 0;
        }
        this.world.camera_x = -this.x + 100;
    }

    moveRight(){
        super.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
        this.idleTimer = 0;
    }

    moveLeft(){
        super.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
        this.idleTimer = 0;
    }

    canMoveRight(){
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x
    }

    canMoveLeft(){
        return this.world.keyboard.LEFT && this.x > 0
    }

    animations() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_ISDEAD)
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.gethit_sound.play();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            // Walk Animation
            if (this.moveToSide()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }

    moveToSide(){
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT
    }

    increaseIdleTimer() {
        if (this.noInteractions) {
            this.idleTimer++;
        }
    }

    idle() {
        if (this.shortTimeWithoutActions()) {
            this.playAnimation(this.IMAGES_IDLE);
        } else if (this.longTimeWithoutActions()) {
            this.playAnimation(this.IMAGES_LONGIDLE);
        }
    }

    longTimeWithoutActions(){
        return this.idleTimer > 10
    }

    shortTimeWithoutActions(){
        return this.idleTimer > 0 && this.idleTimer < 10
    }

    noInteractions() {
        return !this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.UP &&
            !this.world.keyboard.D &&
            !this.isHurt();
    }


    offset = {
        top: 125,
        bottom: 0,
        right: 20,
        left: 20
    }


}