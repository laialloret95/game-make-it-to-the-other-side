document.addEventListener('DOMContentLoaded', () => {
    const startPage = document.getElementById('intro');
    const startButton = document.getElementById('start');
    const gamePage = document.getElementById('game');
    const gameOverPage = document.getElementById('gameover');
    const playAgainButton = document.getElementById('play-again');

    // Canvas Layers
    const canvas = document.getElementById('canvas1');
    const ctx1 = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 900;
    
    const canvas2 = document.getElementById('canvas2');
    const ctx2 = canvas2.getContext('2d');
    canvas2.width = 900;
    canvas2.height = 900;
    
    const canvas3 = document.getElementById('canvas3');
    const ctx3 = canvas3.getContext('2d');
    canvas3.width = 900;
    canvas3.height = 900;

    // Images
    const jabaliImg = new Image();
    jabaliImg.src = '/images/porc-senglar.png'

    const rockmanImg = new Image();
    rockmanImg.src = '/images/rock-man.png'

    const monster = new Image();
    monster.src = '/images/monster.png'
    
    const car1 = new Image(); car1.src = '/images/cars/audi-right.png';
    const car2 = new Image(); car2.src = '/images/cars/Black_viper-right.png';
    const car3 = new Image(); car3.src = '/images/cars/Car-right.png';
    const car4 = new Image(); car4.src = '/images/cars/Mini_truck-left.png';
    const car5 = new Image(); car5.src = '/images/cars/Mini_van-left.png';
    const car6 = new Image(); car6.src = '/images/cars/Police-left.png';

    const rightCars = [car1,car2,car3];
    const leftCars = [car4,car5,car6];
    const cell = 60;
  
    function printGameOver() {
        gamePage.classList.remove('show');
        gamePage.classList.add('hide');
        gameOverPage.style = 'display: block';
    }
    
    startButton.addEventListener('click', () => {
        startPage.classList.remove('show');
        startPage.classList.add('hide');

        gamePage.classList.remove('hide');
        gamePage.classList.add('show');

        const mainGame = new Game(
            {
                ctx1: ctx1,
                ctx2: ctx2,
                ctx3: ctx2,
                canvasWidth: canvas.width,
                canvasHeight: canvas.height,
                jabaliImg: jabaliImg,
                monster: monster,
                rockmanImg: rockmanImg,
                player: player = new Player(ctx2, cell,canvas.width, canvas.height),
                cell: cell,
                obstacleConstructor: Obstacle,
                rightCars: rightCars,
                leftCars: leftCars,
            },
            printGameOver
        );
        mainGame.start();
    });

    playAgainButton.addEventListener('click', () => {
        gameOverPage.style = 'display: none';
        gamePage.classList.add('show');
        gamePage.classList.remove('hide');

        const mainGame = new Game(
            {
                ctx1: ctx1,
                ctx2: ctx2,
                ctx3: ctx2,
                canvasWidth: canvas.width,
                canvasHeight: canvas.height,
                jabaliImg: jabaliImg,
                monster: monster,
                rockmanImg: rockmanImg,
                player: player = new Player(ctx2, cell,canvas.width, canvas.height),
                cell: cell,
                obstacleConstructor: Obstacle,
                rightcars: rightcars,
                leftcars: leftcars,
            },
            printGameOver
        );
        mainGame.start();
    });
})
