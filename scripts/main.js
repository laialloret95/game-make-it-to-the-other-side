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

    const assasinImg = new Image(); 
    assasinImg.src = '/images/rockman.png'

    const lifePreserverImg = new Image(); 
    lifePreserverImg.src = '/images/life-preserver.png'

    const turtleImg = new Image(); 
    turtleImg.src = '/images/turtle.png'

    const playerUpImg = new Image(); playerUpImg.src = '/images/women-phone-up.png';
    const playerLeftImg = new Image(); playerLeftImg.src = '/images/women-phone-left.png';
    const playerRightImg = new Image(); playerRightImg.src = '/images/women-phone-right.png';
    const playerDownImg = new Image(); playerDownImg.src = '/images/women-phone-down.png';

    const playerImgs = [playerUpImg,playerLeftImg,playerDownImg,playerRightImg];

    const car1 = new Image(); car1.src = '/images/cars/audi-right.png';
    const car2 = new Image(); car2.src = '/images/cars/Black_viper-right.png';
    const car3 = new Image(); car3.src = '/images/cars/Car-right.png';
    const car4 = new Image(); car4.src = '/images/cars/Mini_truck-left.png';
    const car5 = new Image(); car5.src = '/images/cars/Mini_van-left.png';
    const car6 = new Image(); car6.src = '/images/cars/Police-left.png';

    const rightCars = [car1,car2,car3];
    const leftCars = [car4,car5,car6];

    const boat1 = new Image(); boat1.src = '/images/boats/inflable-yellow-right.png';
    const boat2 = new Image(); boat2.src = '/images/boats/inflatable-boat-right.png';
    const boat3 = new Image(); boat3.src = '/images/boats/inflable-right.png';
    const boat4 = new Image(); boat4.src = '/images/boats/inflable-left.png';
    const boat5 = new Image(); boat5.src = '/images/boats/inflable-yellow-left.png';
    const boat6 = new Image(); boat6.src = '/images/boats/inflatable-boat-left.png';

    const rightBoats = [boat1,boat2,boat3];
    const leftBoats = [boat4,boat5,boat6];

    const collisionImg = new Image(); 
    collisionImg.src = '/images/collisions.png';

    const donut1 = new Image(); donut1.src = '/images/donuts/blue_icing.png';
    const donut2 = new Image(); donut2.src = '/images/donuts/chocolate_icing.png';
    const donut3 = new Image(); donut3.src = '/images/donuts/pink_icing_sprinkles.png';
    const donut4 = new Image(); donut4.src = '/images/donuts/dark_red_icing.png';
    const donut5 = new Image(); donut5.src = '/images/donuts/green_icing_green_sprinkles.png';
    const donut6 = new Image(); donut6.src = '/images/donuts/orange_icing_chocolate_shaving.png';
    const donut7 = new Image(); donut7.src = '/images/donuts/white_icing_sprinkles.png';

    const donutsImg = [donut1,donut2,donut3,donut4,donut5,donut6,donut7];

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
                playerImgs: playerImgs,
                assasinImg: assasinImg,
                turtleImg: turtleImg,
                lifePreserverImg: lifePreserverImg,
                collisionImg : collisionImg,
                donutsImg: donutsImg,
                player: player = new Player(ctx2, cell,canvas.width, canvas.height),
                food: food = new Food(cell,canvas.width, canvas.height),
                cell: cell,
                obstacleConstructor: Obstacle,
                rightCars: rightCars,
                leftCars: leftCars,
                rightBoats: rightBoats,
                leftBoats: leftBoats,
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
                playerImgs: playerImgs,
                assasinImg: assasinImg,
                turtleImg: turtleImg,
                lifePreserverImg: lifePreserverImg,
                collisionImg : collisionImg,
                donutsImg: donutsImg,
                player: player = new Player(ctx2, cell,canvas.width, canvas.height),
                food: food = new Food (cell,canvas.width, canvas.height),
                cell: cell,
                obstacleConstructor: Obstacle,
                rightCars: rightCars,
                leftCars: leftCars,
                rightBoats: rightBoats,
                leftBoats: leftBoats,
            },
            printGameOver
        );
        mainGame.start();
    });
})
