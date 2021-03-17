class Food {
    constructor(cell, canvasWidth, canvasHeight) {
        this.width = cell / 1.5;
        this.height = cell / 1.5;
        this.x = Math.floor(Math.random() * (canvasWidth - this.width));
        this.y = Math.floor(Math.random() * (canvasHeight - this.height));
        this.type = "";
        this.frameX = [0, 139, 137*2];
        this.frameY = [0, 158, 158*2]
        this.randDonut = Math.floor(Math.random() * 7);
    }
    draw(ctx1, donutArray) {
        ctx1.drawImage(donutArray[this.randDonut],this.x, this.y, this.width, this.height)
    }
    update(canvasWidth, canvasHeight) {
        this.x = Math.floor(Math.random() * (canvasWidth - this.width));
        this.y = Math.floor(Math.random() * (canvasHeight - this.height));
        this.randDonut = Math.floor(Math.random() * 7);
    }
}