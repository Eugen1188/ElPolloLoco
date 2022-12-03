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
    throwableObject = [];



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.collectCollision();
        this.checkEnemyisHitting();
        this.checkBossFight();
    }

    setWorld() {
        this.character.world = this;
    }

    checkBossFight() {
        setInterval(() => {
            if (this.character.x > 2000) {
                this.level.enemies[6].startFight = true;
            }
        }, 1000 / 60);
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 1000 / 60);

    }

    collectCollision() {
        setInterval(() => {
            this.checkCollisionsCoins();
            this.checkThrowObjects()
            this.checkCollisionBottles();
        }, 1000 / 60);

    }

    checkEnemyisHitting() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) && enemy.energy > 0) {
                    this.character.hit();
                    this.statusBarHealth.setPercentageHealth(this.character.energy);
                    console.log('Collision with Chracter, energy', this.character.energy);
                }
            });
        }, 200);
    }


    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottles > 0) {
            let bottle = new ThrowableObjects(this.character.x + 40, this.character.y + 100);
            this.throwableObject.push(bottle);
            this.character.bottles--;

            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && enemy.energy > 0){
                    console.log('Gegner wurde getroffen!!');
                }

            });
            this.statusBarBottle.setPercentageBottle(this.character.bottles);

        }
    }



    /*
        checkCollisions(){
            this.level.enemies.forEach((enemy) =>{
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBarHealth.setPercentageHealth(this.character.energy);
                    console.log('Collision with Chracter, energy', this.character.energy);
                }
            });
        }
    
    
    
       checkHitEnemy(){
            this.level.enemies.forEach((enemy) =>{
                if (this.character.isColliding(enemy) && this.character.isAboveGround) {
                    this.character.jump();
                }});
        }
        */


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && enemy.energy != 0) {
                this.character.jump();
                if (enemy.energy == 1) {
                    enemy.energy = 0;
                    enemy.enemyDead();
                }
                console.log(enemy);
            }
            /*           else if(this.character.isColliding(enemy) && enemy.energy == 1){
                           this.character.hit();
                           this.statusBarHealth.setPercentageHealth(this.character.energy); 
                           console.log('Collision with Chracter, energy', this.character.energy); 
                      }
                      */
        });
    }

    checkCollisionsCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                console.log(this.level.coins.indexOf(coin));
                let coinNum = this.level.coins.indexOf(coin);
                this.level.coins.splice(coinNum, 1)
                if (this.character.coins < 100) {
                    this.character.coins += 20;
                }
                this.statusBarCoin.setPercentageCoin(this.character.coins);
                console.log('You have', this.character.coins, 'coins');
            }
        });
    }


    checkCollisionBottles() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                let bottleNum = this.level.bottles.indexOf(bottle);
                this.level.bottles.splice(bottleNum, 1)
                if (this.character.bottles < 6) {
                    this.character.bottles += 1;
                }
                this.statusBarBottle.setPercentageBottle(this.character.bottles);
            }

        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)  // canvas wird jedes mal neu geladen

        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.ctx.translate(-this.camera_x, 0)
        // ---- Space for fixed objects ------
        this.addTopMap(this.statusBarHealth);
        this.addTopMap(this.statusBarBottle);
        this.addTopMap(this.statusBarCoin);

        this.ctx.translate(this.camera_x, 0);

        this.addTopMap(this.character);
        this.addObjectsToMap(this.level.enemies);
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