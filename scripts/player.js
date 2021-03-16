class Player {
    constructor(context, cell, canvasWidth, canvasHeight) {
        this.context = context;
        this.cell = cell;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.spriteWidth = 463; // width of one frame
        this.spriteHeight = 533; // height of one frame
        this.width = this.spriteWidth / 8;
        this.height = this.cell;
        // coordinates when the player first appears
        this.x = this.canvasWidth / 2 - this.width / 2;
        this.y = this.canvasHeight - this.height;
        // prevent player from moving without stop when clicking once on arrow key
        this.inMotion = false;
        // animate player if we have spritesheet
        this.frameX = 0;
        this.frameY = 0;
    }
    draw(ctx2,img) {
        // this.context.fillStyle = 'black';
        // this.context.fillRect(this.x, this.y, this.width, this.height);
        ctx2.drawImage(img,this.x + 3, this.y, this.width / 1.1, this.height)
    }
    update(arrows) {
        if (arrows['ArrowUp'] && !this.inMotion) {
            this.y -= this.cell;
            this.inMotion = true;
        }
        if (arrows['ArrowLeft'] && !this.inMotion && this.x > this.cell) {
            this.x -= this.cell;
            this.inMotion = true;
        }
        if (arrows['ArrowDown'] && !this.inMotion && this.y + this.height < this.canvasHeight) {
            this.y += this.cell;
            this.inMotion = true;
        }
        if (arrows['ArrowRight'] && !this.inMotion && this.x + this.width < this.canvasWidth - this.cell) {
            this.x += this.cell;
            this.inMotion = true;
        }
    }
    resetPlayer(canvasWidth, canvasHeight) {
        setTimeout(() => {
            this.x = canvasWidth / 2 - this.width / 2;
            this.y = canvasHeight - this.height;
        }, 500)
    }


}