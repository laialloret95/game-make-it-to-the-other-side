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
        // Images
        this.jabaliImg = options.jabaliImg;
        this.monster = options.monster;
        // Callback
        this.cb = callback;
        // Global variables
        this.score = 0;
        this.collisionsCount = 0;
        this.health = 10;
        this.frame = 0;
        this.gameSpeed = 1;
        this.safe = false;
        this.gameOver = false;
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
    clean() {
        this.ctx1.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx2.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx3.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
    update() {
        this.clean();
        this.player.draw();
        window.requestAnimationFrame(this.update.bind(this));
    }
    start() {
        this.assignControlsToKeys();
        window.requestAnimationFrame(this.update.bind(this));
    }

}