class Game {
    constructor(options, callback) {
        this.ctx1 = options.ctx1;
        this.ctx2 = options.ctx2;
        this.ctx3 = options.ctx3;
        this.canvasWidth = options.canvasWidth;
        this.canvasHeight = options.canvasHeight;
        this.cell = options.cell;
        this.obstacleConstructor = options.obstacleConstructor;
        this.rightCars = options.rightCars;
        this.leftCars = options.leftCars;
        //Player
        this.player = options.player;
        // Images
        this.jabaliImg = options.jabaliImg;
        this.rockmanImg = options.rockmanImg;
        this.monster = options.monster;
        // Print Game Over callback
        this.printGameOver = callback;
        // Global variables
        this.score = 0;
        this.collisionsCount = 0;
        this.health = 2;
        this.frame = 0;
        this.gameSpeed = 1;
        this.safe = false;
        this.randIndexCars = Math.floor(Math.random() * this.rightCars.length);
        // Arrays
        this.arrows = [];
        this.landArray = [];
        this.waterArray = [];
    }
    assignControlsToKeys() {
        window.addEventListener('keydown', function(e) {
            this.arrows = [];
            this.arrows[e.code] = true;
            this.player.update(this.arrows);
            
        })
        
        window.addEventListener('keyup', function(e) {
            delete this.arrows[e.code];
            player.inMotion = false;
        })
    }
    initObstacles() {
        // ROAD
        // lane 1
        for (let i = 0; i < 3; i++) { // 2 cars
            let x = i * 350;
            this.landArray.push(new this.obstacleConstructor(x, this.canvasHeight - this.cell * 3, this.cell*1.5, this.cell-1, 1.5, 'car'));
        }
        // lane 2
        for (let i = 0; i < 3; i++) { // 2 cars
            let x = i * 300; 
            this.landArray.push(new this.obstacleConstructor(x, this.canvasHeight - this.cell * 5 + 15, this.cell*1.8, this.cell-1, -2, 'car'));
        }

        // WATER
        // lane 3
        for (let i = 0; i < 1; i++) { // 1 life preserver
            this.waterArray.push(new this.obstacleConstructor(0, this.cell * 9, this.cell * 1.8, this.cell, 1.5, 'lifePreserver'));
        }
        // lane 4
        for (let i = 0; i < 2; i++) { // 2 boats
            let x = i * 300; 
            this.waterArray.push(new this.obstacleConstructor(x, this.cell * 8, this.cell * 1.8, this.cell, -2, 'boat'));
        }
        // lane 5
        for (let i = 0; i < 2; i++) { // 2 boats
            let x = i * 300; 
            this.waterArray.push(new this.obstacleConstructor(x, this.cell * 7, this.cell * 1.8, this.cell, 2, 'boat'));
        }
        // lane 6
        for (let i = 0; i < 3; i++) { // 3 doplhins
            let x = i * 300;
            this.waterArray.push(new this.obstacleConstructor(x, this.cell * 5, this.cell * 1.8, this.cell * 2, -1.5, 'dolphin'));
        }

        // SAND
        // lane 7
        for (let i = 0; i < 2; i++) { // 3 rockman
            let x = i * 300;
            this.landArray.push(new this.obstacleConstructor(x, this.cell * 3.5, this.cell * 1.8, this.cell * 1.3 -1 , 2, 'rockman'));
        }
        // lane 8
        for (let i = 0; i < 3; i++) { // 3 jabalis
            let x = i * 300;
            this.landArray.push(new this.obstacleConstructor(x, this.cell * 2, this.cell * 1.8, this.cell-1, -4, 'jabali'));
        }
    }
    clean() {
        this.ctx1.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx2.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx3.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
    handleObstacles() {
        this.landArray.forEach(landObj => {
            landObj.updateObstacle(this.gameSpeed, this.canvasWidth);
            landObj.drawLandObstacles(this.ctx2, this.frame,this.jabaliImg, this.rockmanImg,this.leftCars, this.rightCars);
            if(this.collision(this.player,landObj)) {
                this.resetGame();
            }
        });
        this.waterArray.forEach( waterObj => {
            waterObj.updateObstacle(this.gameSpeed, this.canvasWidth);
            waterObj.drawWaterObstacles(this.ctx1, this.frame,this.jabaliImg);
        });
        if(this.player.y >= 300 && this.player.y < 600) {
            this.safe = false;
            this.waterArray.forEach(waterObj => {
                if (this.waterCollision(this.player, waterObj)) {
                    this.player.x += waterObj.speed;
                    this.safe = true;
                }
            })
            if (!this.safe) {
                this.resetGame();
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
    resetGame() {
        this.player.resetPlayer(this.canvasWidth, this.canvasHeight);
        this.health--;
        this.collisionsCount++;
        this.gameSpeed = 1;
    }
    getRandom
    update() {
        this.clean();
        this.player.draw(this.ctx2, this.monster);
        this.handleObstacles();
        if (this.player.y < 0) this.scored();
        this.showScoreBoard();
        if (this.health > 0) window.requestAnimationFrame(this.update.bind(this));
        else this.printGameOver();
    }
    scored() {
        this.score++;
        this.gameSpeed += 0.05;
        this.player.x = this.canvasWidth / 2 - this.player.width / 2;
        this.player.y = this.canvasHeight - this.player.height;
    }
    showScoreBoard() {
        this.ctx3.fillStyle = 'white';
        this.ctx3.strokeStyle = 'white'
        this.ctx3.font = '22px Verdana';
        this.ctx3.fillText(`Score: ${this.score}`, 20,30);
        this.ctx3.fillText(`Health: ${this.health}`, 20,60);
        this.ctx3.fillText(`Collisions: ${this.collisionsCount}`, 720,30);
        this.ctx3.fillText(`Game Speed: ${this.gameSpeed.toFixed(2)}`, 650,60);
    }
    start() {
        this.assignControlsToKeys();
        this.initObstacles();
        window.requestAnimationFrame(this.update.bind(this));
    }
}