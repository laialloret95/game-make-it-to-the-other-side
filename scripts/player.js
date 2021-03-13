class Player {
    constructor() {
        this.spriteWidth = 463; // width of one frame
        this.spriteHeight = 533; // height of one frame
        this.width = this.spriteWidth / 8;
        this.height = cell;
        // coordinates when the player first appears
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height;
        // prevent player from moving without stop when clicking once on arrow key
        this.inMotion = false;
        // animate player if we have spritesheet
        this.frameX = 0;
        this.frameY = 0;
    }
    draw() {
        ctx2.fillStyle = 'black';
        ctx2.fillRect(this.x, this.y, this.width, this.height);
        ctx2.drawImage(monster, 0, 0, 463, 533, 
            this.x, this.y, this.width, this.height)
    }
    update() {
        if (arrows['ArrowUp'] && !this.inMotion) {
            this.y -= cell;
            this.inMotion = true;
        }
        if (arrows['ArrowLeft'] && !this.inMotion && this.x > cell) {
            this.x -= cell;
            this.inMotion = true;
        }
        if (arrows['ArrowDown'] && !this.inMotion && this.y + this.height < canvas.height) {
            this.y += cell;
            this.inMotion = true;
        }
        if (arrows['ArrowRight'] && !this.inMotion && this.x + this.width < canvas.width - cell) {
            this.x += cell;
            this.inMotion = true;
        }
        if (this.y < 0) scored();
    }

}