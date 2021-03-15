// Obstacles
class Obstacle {
    constructor(x, y, width, height, speed, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
        this.frameX = 0;
        this.frameY = 0;
        this.randomise = Math.floor(Math.random() * 10 + 5); // between 30 and 60
        this.carNum = Math.floor(Math.random() * 3)
    }
    // drawObstacle(ctx1,frame, jabaliImg) {
    //     if (this.type === 'jabali') {
    //         if (frame % this.randomise === 0) { // Controls animation movement
    //             // cycle between the 2 columns of spritesheet
    //             if (this.frameX >= 7) this.frameX = 0;
    //             else this.frameX++;
    //         }
    //         ctx1.drawImage(jabaliImg, this.frameX * 72.25, 0, 72.25, 55, 
    //             this.x, this.y, this.width, this.height)
    //     } else {
    //         ctx1.fillStyle = 'blue'
    //         ctx1.fillRect(this.x, this.y, this.width, this.height);
    //     }
    // }
    drawLandObstacles(ctx2,frame, jabaliImg, rockmanImg, LeftCarArray, RightCarArray) {
        if (this.type === 'jabali') {
            if (frame % this.randomise === 0) { // Controls animation movement
                // cycle between the 7 columns of spritesheet
                if (this.frameX >= 7) this.frameX = 0;
                else this.frameX++;
            }
            ctx2.drawImage(jabaliImg, this.frameX * 72.25, 0, 72.25, 55, 
                this.x, this.y, this.width, this.height)
        } 
        else if (this.type === 'rockman') {
            // ctx2.fillStyle = 'blue'
            // ctx2.fillRect(this.x, this.y, this.width, this.height);
            ctx2.drawImage(rockmanImg, this.frameX * 72.25, 0, 72.25, 55, 
                this.x + 10, this.y, this.width / 1.05, this.height / 1.05)
        }
        else if (this.type === 'car' && this.speed < 0) {
            // ctx2.fillStyle = 'blue'
            // ctx2.fillRect(this.x, this.y, this.width, this.height);
            ctx2.drawImage(LeftCarArray[this.carNum], this.frameX * 256, 0, 256, 256, 
                this.x - 10, this.y - 45, this.width * 1.22, this.height * 2.6)
        }
        else if (this.type === 'car' && this.speed > 0) {
            // ctx2.fillStyle = 'blue'
            // ctx2.fillRect(this.x, this.y, this.width, this.height);
            ctx2.drawImage(RightCarArray[this.carNum], this.frameX * 256, 0, 256, 256, 
                this.x - 10, this.y - 45, this.width * 1.22, this.height * 2.6)
        }
        else {
            ctx2.fillStyle = 'blue'
            ctx2.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    drawWaterObstacles(ctx1, waterImg) {
        ctx1.fillStyle = 'blue'
        ctx1.fillRect(this.x, this.y, this.width, this.height);
        // ctx2.drawImage(car, this.frameX * this.width, this.carType * this.height, grid * 2, grid, this.x, this.y, this.width, this.height);
    }
    updateObstacle(gameSpeed, canvasWidth) {
        this.x += this.speed * gameSpeed; // multiplying to mantain obstacle directions (we are going to have negative value for those going left)
        if (this.speed > 0 && this.x > canvasWidth + this.width) { // make obstacles going right reapear
            this.x = 0 - this.width;
            this.carNum = Math.floor(Math.random() * 3)
        } else if (this.speed < 0 && this.x + this.width < 0) { // make obstacles going left reapear
            this.x = canvasWidth + this.width;
            this.carNum = Math.floor(Math.random() * 3)
        }
    }
}