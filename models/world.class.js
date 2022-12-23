class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    startScreen = new Startscreen();
    throwableObject = [];
    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/bottle.mp3');
    bottle_break_sound = new Audio('audio/bottle_break.mp3');
    endboss = this.level.enemies[this.level.enemies.length - 1];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.checkForGameOver();
    }

    checkForGameOver() {
        setInterval(() => {
            if (this.character.isDead()) {
                setTimeout(() => {
                    this.showYouLostScreen();
                    this.clearAllIntervals();
                    this.refreshPageWithTimer();
                    gameMusic.pause();
                }, 1500);
            } else if (this.endboss.isDead()) {
                setTimeout(() => {
                    this.showGameOverScreen();
                    this.clearAllIntervals();
                    this.refreshPageWithTimer();
                    gameMusic.pause();
                }, 1500);
            }
        }, 1000);
    }

    refreshPageWithTimer() {
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }

    showYouLostScreen() {
        let lost = document.getElementById('gameOverScreenLost');
        lost.style.display = "flex";
        lost.style.zIndex = "999";
    }

    showGameOverScreen() {
        let win = document.getElementById('gameOverScreenWin');
        win.style.display = "flex";
        win.style.zIndex = "999";
    }

    checkPlayMusic(){
        if (this.playMusic) {
            this.gameMusic.play();
        }
    }

    setWorld() {
        this.character.world = this;
    }

    checkBossFight() {
            if (this.character.x > 2000) {
                this.endboss.firstContact = true;
            }
    }

    run() {
        setInterval(() => {
            this.checkPeppeHitsEnemy();
            this.checkCollisionsCoins();
            this.checkCollisionBottles();
            this.checkPlayMusic();
            this.checkBossFight();
        }, 1000 / 60);
        setInterval(() => this.checkEnemyHitsPeppe(), 200);
        setInterval(() => this.checkThrowObjects(), 100);
    }

    checkEnemyHitsPeppe() {
        this.level.enemies.forEach((enemy) => {
            if (this.hitboxColliding(enemy)) {
                this.PeppeGetHit();
            }
        });
    }

    PeppeGetHit(){
        this.character.hit(20);
        this.character.idleTimer = 0;
        this.statusBarHealth.setPercentageHealth(this.character.energy);
    }

    hitboxColliding(enemy) {
        return this.character.isColliding(enemy) &&
            !enemy.isDead() &&
            this.character.speedY >= 0
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottles > 0) {
            this.throwBottle();
            this.character.idleTimer = 0;
        }
        this.throwableObject.forEach((to) => {
            this.level.enemies.forEach(enemy => {
                if (this.bottleCollidingWithEnemy(to, enemy)) {
                    this.hitEnemyWithBottle(enemy, to);
                }
                if (to.y > 500) {
                    this.throwableObject.splice(to, 1);
                }
            });
        });
        this.statusBarBottle.setPercentageBottle(this.character.bottles);
    }

    bottleCollidingWithEnemy(to, enemy){
       return to.isColliding(enemy) && enemy.energy > 0
    }

    hitEnemyWithBottle(enemy, to){
        enemy.hit(1);
        this.throwableObject.splice(to, 1);
        this.bottle_break_sound.play();
    }

    throwBottle() {
        let bottle = new ThrowableObjects(this.character.x + 40, this.character.y + 100);
        this.throwableObject.push(bottle);
        this.character.bottles--;
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    checkPeppeHitsEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.jumpOnEnemy(enemy)) {
                if (enemy instanceof Chicken) {
                    this.character.jump();
                    if (enemy.energy == 1) {
                        enemy.energy--;
                    }
                }
            }
        });
    }

    jumpOnEnemy(enemy) {
        return this.character.isColliding(enemy) && enemy.energy != 0 && this.character.speedY < 0
    }


    checkCollisionsCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.collectCoin(coin);
                if(!this.maxCoins())
                this.statusBarCoin.setPercentageCoin(this.character.coins);
            }
        });
    }

    maxCoins(){
        return this.character.coins > 100
    }

    collectCoin(coin){
        this.coin_sound.play();
        let coinNum = this.level.coins.indexOf(coin);
        this.level.coins.splice(coinNum, 1)
        this.character.coins += 20;
    }

    checkCollisionBottles() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                this.collectBottle(bottle)
            }
        });
    }

    collectBottle(bottle){
        this.bottle_sound.play();
        let bottleNum = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(bottleNum, 1)
        if (freeBottleSpace()) {
            this.character.bottles++;
            this.updateStatusBarBottle();
        }
    }

    freeBottleSpace(){
        return this.character.bottles < 6
    }

    updateStatusBarBottle(){
        this.statusBarBottle.setPercentageBottle(this.character.bottles);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)  // canvas wird jedes mal neu geladen

        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0)
        // ---- Space for fixed objects ------
        this.addTopMap(this.statusBarHealth);
        this.addTopMap(this.statusBarBottle);
        this.addTopMap(this.statusBarCoin);

        this.ctx.translate(this.camera_x, 0);

        this.addTopMap(this.character);

        this.ctx.translate(- this.camera_x, 0)

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addTopMap(o);
        });
    }

    addTopMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        //    mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}

