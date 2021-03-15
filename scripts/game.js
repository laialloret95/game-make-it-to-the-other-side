class Game {
    constructor(options, callback) {
        this.ctx1 = options.ctx1;
        this.ctx2 = options.ctx2;
        this.ctx3 = options.ctx3;
        this.canvasWidth = options.canvasWidth;
        this.canvasHeight = options.canvasHeight;
        this.cell = options.cell;
        this.obstacleConstructor = options.obstacleConstructor;
        //Player
        this.player = options.player;
        // Images
        this.jabaliImg = options.jabaliImg;
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
        // lane 1
        for (let i = 0; i < 2; i++) { // 2 cars
            let x = i * 350;
            this.landArray.push(new this.obstacleConstructor(x, this.canvasHeight - this.cell * 3, this.cell*1.5, this.cell-1, 1.5, 'car'));
        }
        // lane 2
        for (let i = 0; i < 2; i++) { // 2 cars
            let x = i * 300; 
            this.landArray.push(new this.obstacleConstructor(x, this.canvasHeight - this.cell * 5 + 15, this.cell*1.8, this.cell-1, -2, 'car'));
        }
        // lane 3
        for (let i = 0; i < 1; i++) { // 1 life preserver
            this.waterArray.push(new this.obstacleConstructor(0, this.cell * 9, this.cell * 1.8, this.cell - 2, 1.5, 'lifePreserver'));
        }
        // lane 4
        for (let i = 0; i < 2; i++) { // 2 boats
            let x = i * 300; 
            this.waterArray.push(new this.obstacleConstructor(x, this.cell * 8, this.cell * 1.8, this.cell - 2 , -2, 'boat'));
        }
        // lane 5
        for (let i = 0; i < 2; i++) { // 2 boats
            let x = i * 300; 
            this.waterArray.push(new this.obstacleConstructor(x, this.cell * 7, this.cell * 1.8, this.cell - 2 , 2, 'boat'));
        }
        // lane 6
        for (let i = 0; i < 3; i++) { // 3 doplhins
            let x = i * 300;
            this.waterArray.push(new this.obstacleConstructor(x, this.cell * 5, this.cell * 1.8, this.cell*2 - 2, -1.5, 'dolphin'));
        }
        // lane 7
        for (let i = 0; i < 2; i++) { // 3 rockman
            let x = i * 300;
            this.landArray.push(new this.obstacleConstructor(x, this.cell * 3.5, this.cell * 1.8, this.cell-1, 2, 'rockman'));
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
            landObj.drawObstacle(this.ctx1, this.frame,this.jabaliImg);
            if(this.collision(this.player,landObj)) {
                this.resetGame();
            }
        })
        this.waterArray.forEach( waterObj => {
            waterObj.updateObstacle(this.gameSpeed, this.canvasWidth);
            waterObj.drawObstacle(this.ctx1, this.frame,this.jabaliImg);
            if (this.collision(this.player, waterObj)) {
                this.player.x += waterObj.speed;
                this.safe = true;
            }
        })
    }
    collision(character, enemy) {
        return !(   character.x > enemy.x + enemy.width        ||
                    character.x + character.width < enemy.x    ||
                    character.y > enemy.y + enemy.height       ||
                    character.y + character.height < enemy.y);
    }
    resetGame() {
        this.player.resetPlayer(this.canvasWidth, this.canvasHeight);
        this.health--;
        this.collisionsCount++;
        this.gameSpeed = 1;
    }
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