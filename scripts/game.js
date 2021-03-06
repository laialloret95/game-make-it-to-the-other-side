class Game {
    constructor(options, callback) {
        this.ctx1 = options.ctx1;
        this.ctx2 = options.ctx2;
        this.ctx3 = options.ctx3;
        this.canvasWidth = options.canvasWidth;
        this.canvasHeight = options.canvasHeight;
        this.cell = options.cell;
        //Player
        this.player = options.player;
        // Obstacles
        this.obstacleConstructor = options.obstacleConstructor;
        // Food
        this.food = options.food;
        // Images
        this.rightCarsImg = options.rightCarsImg;
        this.leftCarsImg = options.leftCarsImg;
        this.rightBoatsImg = options.rightBoatsImg,
        this.leftBoatsImg = options.leftBoatsImg,
        this.jabaliImg = options.jabaliImg;
        this.assasinImg = options.assasinImg;
        this.playerImgs = options.playerImgs;
        this.lifePreserverImg = options.lifePreserverImg;
        this.turtleImg = options.turtleImg;
        this.collisionImg = options.collisionImg;
        this.donutsImg = options.donutsImg;
        // Sounds
        this.crashSound =  options.crashSound,
        this.waterSplashSound = options.waterSplashSound,
        this.crunchSound = options.crunchSound,
        this.successSound = options.successSound,
        // Game Over callback
        this.printGameOver = callback;
        // Global variables
        this.score = 0;
        this.collisionsCount = 0;
        this.health = 5;
        this.frame = 0;
        this.gameSpeed = 1;
        this.safe = false;
        this.randIndexCars = Math.floor(Math.random() * this.rightCarsImg.length);
        this.playerImg = this.playerImgs[0];
        // Arrays
        this.arrows = []; 
        this.landArray = [];
        this.waterArray = [];
    }
    assignControlsToKeys() {
        window.addEventListener('keydown', (e) => {
            if (this.player.playerCollision) return;
            else {
                this.arrows = [];
                this.arrows[e.code] = true;
                this.player.update(this.arrows);
                if (this.arrows['ArrowUp']) this.playerImg = this.playerImgs[0];
                if (this.arrows['ArrowLeft']) this.playerImg = this.playerImgs[1];
                if (this.arrows['ArrowDown']) this.playerImg = this.playerImgs[2];
                if (this.arrows['ArrowRight']) this.playerImg = this.playerImgs[3];
            }
        })
        
        window.addEventListener('keyup', (e) => {
            if (this.player.playerCollision) return;
            else {
                delete this.arrows[e.code];
                player.inMotion = false;
            }
        })
    }
    initObstacles() {
        // ROAD
        // lane 1
        for (let i = 0; i < 3; i++) { // 3 cars
            let x = i * 350;
            this.landArray.push(new this.obstacleConstructor(x, this.canvasHeight - this.cell * 3, this.cell*1.5, this.cell-1, 1.5, 'car'));
        }
        // lane 2
        for (let i = 0; i < 2; i++) { // 2 cars
            let x = i * 300; 
            this.landArray.push(new this.obstacleConstructor(x, this.canvasHeight - this.cell * 5 + 15, this.cell*1.8, this.cell-1, -2, 'car'));
        }

        // WATER
        // lane 3
        for (let i = 0; i < 1; i++) { // 1 life preserver
            this.waterArray.push(new this.obstacleConstructor(0, this.cell * 9, this.cell * 1.2, this.cell, 1.5, 'lifePreserver'));
        }
        // lane 4
        for (let i = 0; i < 2; i++) { // 2 boats
            let x = i * 300; 
            this.waterArray.push(new this.obstacleConstructor(x, this.cell * 8, this.cell * 1.8, this.cell, -2, 'boat'));
        }
        // lane 5
        for (let i = 0; i < 1; i++) { // 2 boats
            let x = i * 400; 
            this.waterArray.push(new this.obstacleConstructor(x, this.cell * 7, this.cell * 1.8, this.cell, 2, 'boat'));
        }
        // lane 6
        for (let i = 0; i < 3; i++) { // 3 turtles
            let x = i * 300;
            this.waterArray.push(new this.obstacleConstructor(x, this.cell * 5, this.cell * 1.8, this.cell * 2, -1.5, 'turtle'));
        }

        // SAND
        // lane 7
        for (let i = 0; i < 2; i++) { // 3 assasin
            let x = i * 300;
            this.landArray.push(new this.obstacleConstructor(x, this.cell * 3.5, this.cell * 1.8, this.cell * 1.3 -1 , 2, 'assasin'));
        }
        // lane 8
        for (let i = 0; i < 3; i++) { // 3 jabalis
            let x = i * 600;
            this.landArray.push(new this.obstacleConstructor(x, this.cell * 2, this.cell * 1.8, this.cell-1, -4, 'jabali'));
        }
    }
    clean() {
        this.ctx1.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx2.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx3.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
    handleObstacles() {
        // Land Obstacles
        this.landArray.forEach(landObj => {
            landObj.updateObstacle(this.gameSpeed, this.canvasWidth);
            landObj.drawLandObstacles(this.ctx2, this.frame,this.jabaliImg, this.assasinImg,this.leftCarsImg, this.rightCarsImg);
            if(this.collision(this.player,landObj)) {
                this.ctx2.drawImage(this.collisionImg, 0, 100, 100, 100, this.player.x, this.player.y, 50, 50);
                this.crashSound.play();
                this.resetGame();
                this.player.playerCollision = true;
            }
        });
        // Water Objects
        this.waterArray.forEach( waterObj => {
            waterObj.updateObstacle(this.gameSpeed, this.canvasWidth);
            waterObj.drawWaterObstacles(this.ctx1, this.lifePreserverImg, this.leftBoatsImg, this.rightBoatsImg, this.turtleImg);
        });
        if(this.player.y >= 300 && this.player.y < 600) { // If player is inside water area
            this.safe = false;
            this.waterArray.forEach(waterObj => {
                if (this.waterCollision(this.player, waterObj)) { // If she's colliding with water boat, 1) safe and  2)should move in the oject direction
                    this.player.x += waterObj.speed * this.gameSpeed;
                    this.safe = true;
                }
            })
            if (!this.safe) { // If the player is in water area without colliding with boat she drowns
                this.ctx2.drawImage(this.collisionImg, 0, 0, 100, 100, this.player.x, this.player.y, 50, 50);
                this.waterSplashSound.play();
                this.resetGame();
                this.player.playerCollision = true;
            }
        }
    }
    collision(character, enemy) {
        return !(   character.x > enemy.x + enemy.width        ||
                    character.x + character.width < enemy.x    ||
                    character.y > enemy.y + enemy.height       ||
                    character.y + character.height < enemy.y);
    }
    waterCollision(character, object) {
        return !(   character.x > object.x + object.width          ||
                    character.x + character.width < object.x       ||
                    character.y + 1 > object.y + object.height     || // Need to substract or add 1 in order to avoid double collision with boats
                    character.y + character.height - 1 < object.y);
    }
    foodCollision() {
        this.health++;
        this.crunchSound.play();
        this.food.update(this.canvasWidth, this.canvasHeight);
    }
    resetGame() {
        if (!this.player.playerCollision) {
            this.playerImg = this.playerImgs[0];
            this.player.resetPlayer(this.canvasWidth, this.canvasHeight);
            this.health--;
            this.collisionsCount++;
        }
    }
    update() {
        this.clean();
        this.player.draw(this.ctx2, this.playerImg);
        this.food.draw(this.ctx1, this.donutsImg);
        if (this.frame % 300 === 0) {this.food.update(this.canvasWidth, this.canvasHeight)};
        if (this.collision(this.player, this.food)) {this.foodCollision()};
        this.handleObstacles();
        if (this.player.y < 50) this.scored();
        this.showScoreBoard();
        this.frame++;
        if (this.health <= 0){
            return this.printGameOver();
        } 
        window.requestAnimationFrame(this.update.bind(this));
        
    }
    scored() {
        if (!this.player.playerCollision) {
            this.successSound.play();
            this.score++;
            this.gameSpeed += 0.05;
            this.player.resetPlayer(this.canvasWidth, this.canvasHeight);
            this.player.playerCollision = true;
        }
        
    }
    showScoreBoard() {
        this.ctx3.fillStyle = 'white';
        this.ctx3.strokeStyle = 'white'
        this.ctx3.font = '22px Verdana';
        this.ctx3.fillText(`Score: ${this.score}`, 20,60);
        this.ctx3.fillText(`Health: ${this.health}`, 20,90);
        this.ctx3.fillText(`Collisions: ${this.collisionsCount}`, 720,60);
        this.ctx3.fillText(`Game Speed: ${this.gameSpeed.toFixed(2)}`, 650,90);
    }
    start() {
        this.assignControlsToKeys();
        this.initObstacles();
        window.requestAnimationFrame(this.update.bind(this));
    }
}