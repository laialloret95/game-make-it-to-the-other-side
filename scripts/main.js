document.addEventListener('DOMContentLoaded', () => {
    const startPage = document.getElementById('intro');
    const startButton = document.getElementById('start');
    const gamePage = document.getElementById('game');
    const gameOverPage = document.getElementById('gameover');
    const playAgainButton = document.getElementById('play-again');
    const howToPlayButton = document.getElementById('how-to-play-btn');
    const howToPlayScreen = document.getElementById('how-to-play-screen');
    const howToPlayStartBtn = document.getElementById('how-to-play-start');

    // Canvas Layers
    const waterLayer = document.getElementById('canvas1');
    const ctx1 = waterLayer.getContext('2d');
    waterLayer.width = 900;
    waterLayer.height = 900;
    
    const landLayer = document.getElementById('canvas2');
    const ctx2 = landLayer.getContext('2d');
    landLayer.width = 900;
    landLayer.height = 900;
    
    const scoreBoardLayer = document.getElementById('canvas3');
    const ctx3 = scoreBoardLayer.getContext('2d');
    scoreBoardLayer.width = 900;
    scoreBoardLayer.height = 900;

    // Images
    const jabaliImg = new Image(); 
    jabaliImg.src = 'images/obstacles/porc-senglar.png'

    const assasinImg = new Image(); 
    assasinImg.src = 'images/obstacles/rockman.png'

    const lifePreserverImg = new Image(); 
    lifePreserverImg.src = 'images/obstacles/life-preserver.png'

    const turtleImg = new Image(); 
    turtleImg.src = 'images/obstacles/turtle.png'

    const playerUpImg = new Image(); playerUpImg.src = 'images/character/women-phone-up.png';
    const playerLeftImg = new Image(); playerLeftImg.src = 'images/character/women-phone-left.png';
    const playerRightImg = new Image(); playerRightImg.src = 'images/character/women-phone-right.png';
    const playerDownImg = new Image(); playerDownImg.src = 'images/character/women-phone-down.png';

    const playerImgs = [playerUpImg,playerLeftImg,playerDownImg,playerRightImg];

    const car1 = new Image(); car1.src = 'images/obstacles/cars/audi-right.png';
    const car2 = new Image(); car2.src = 'images/obstacles/cars/Black_viper-right.png';
    const car3 = new Image(); car3.src = 'images/obstacles/cars/Car-right.png';
    const car4 = new Image(); car4.src = 'images/obstacles/cars/Mini_truck-left.png';
    const car5 = new Image(); car5.src = 'images/obstacles/cars/Mini_van-left.png';
    const car6 = new Image(); car6.src = 'images/obstacles/cars/Police-left.png';

    const rightCarsImg = [car1,car2,car3];
    const leftCarsImg = [car4,car5,car6];

    const boat1 = new Image(); boat1.src = 'images/obstacles/boats/inflable-yellow-right.png';
    const boat2 = new Image(); boat2.src = 'images/obstacles/boats/inflatable-boat-right.png';
    const boat3 = new Image(); boat3.src = 'images/obstacles/boats/inflable-right.png';
    const boat4 = new Image(); boat4.src = 'images/obstacles/boats/inflable-left.png';
    const boat5 = new Image(); boat5.src = 'images/obstacles/boats/inflable-yellow-left.png';
    const boat6 = new Image(); boat6.src = 'images/obstacles/boats/inflatable-boat-left.png';

    const rightBoatsImg = [boat1,boat2,boat3];
    const leftBoatsImg = [boat4,boat5,boat6];

    const collisionImg = new Image(); 
    collisionImg.src = 'images/collisions.png';

    const donut1 = new Image(); donut1.src = 'images/donuts/blue_icing.png';
    const donut2 = new Image(); donut2.src = 'images/donuts/chocolate_icing.png';
    const donut3 = new Image(); donut3.src = 'images/donuts/pink_icing_sprinkles.png';
    const donut4 = new Image(); donut4.src = 'images/donuts/dark_red_icing.png';
    const donut5 = new Image(); donut5.src = 'images/donuts/green_icing_green_sprinkles.png';
    const donut6 = new Image(); donut6.src = 'images/donuts/orange_icing_chocolate_shaving.png';
    const donut7 = new Image(); donut7.src = 'images/donuts/white_icing_sprinkles.png';

    const donutsImg = [donut1,donut2,donut3,donut4,donut5,donut6,donut7];

    // Sounds
    const crashSound = document.createElement('audio');
    crashSound.src = 'sounds/crash.ogg';

    const waterSplashSound = document.createElement('audio');
    waterSplashSound.src = 'sounds/water-splash.wav';

    const crunchSound = document.createElement('audio');
    crunchSound.src = 'sounds/crunch.ogg';

    const successSound = document.createElement('audio');
    successSound.src = 'sounds/completetask.mp3';

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
                canvasWidth: waterLayer.width,
                canvasHeight: waterLayer.height,
                jabaliImg: jabaliImg,
                playerImgs: playerImgs,
                assasinImg: assasinImg,
                turtleImg: turtleImg,
                lifePreserverImg: lifePreserverImg,
                collisionImg : collisionImg,
                donutsImg: donutsImg,
                crashSound: crashSound,
                crunchSound: crunchSound,
                waterSplashSound: waterSplashSound,
                successSound: successSound,
                player: player = new Player(ctx2, cell,waterLayer.width, waterLayer.height),
                food: food = new Food(cell,waterLayer.width, waterLayer.height),
                cell: cell,
                obstacleConstructor: Obstacle,
                rightCarsImg: rightCarsImg,
                leftCarsImg: leftCarsImg,
                rightBoatsImg: rightBoatsImg,
                leftBoatsImg: leftBoatsImg,
            },
            printGameOver
        );
        mainGame.start();
    });

    howToPlayButton.addEventListener('click', () => {
        startPage.classList.remove('show');
        startPage.classList.add('hide');
        howToPlayScreen.style = 'display: block';
    });

    howToPlayStartBtn.addEventListener('click', () => {
        howToPlayScreen.style = 'display: none';
        gamePage.classList.remove('hide');
        gamePage.classList.add('show');

        const mainGame = new Game(
            {
                ctx1: ctx1,
                ctx2: ctx2,
                ctx3: ctx2,
                canvasWidth: waterLayer.width,
                canvasHeight: waterLayer.height,
                jabaliImg: jabaliImg,
                playerImgs: playerImgs,
                assasinImg: assasinImg,
                turtleImg: turtleImg,
                lifePreserverImg: lifePreserverImg,
                collisionImg : collisionImg,
                donutsImg: donutsImg,
                crashSound: crashSound,
                crunchSound: crunchSound,
                waterSplashSound: waterSplashSound,
                successSound: successSound,
                player: player = new Player(ctx2, cell,waterLayer.width, waterLayer.height),
                food: food = new Food(cell,waterLayer.width, waterLayer.height),
                cell: cell,
                obstacleConstructor: Obstacle,
                rightCarsImg: rightCarsImg,
                leftCarsImg: leftCarsImg,
                rightBoatsImg: rightBoatsImg,
                leftBoatsImg: leftBoatsImg,
            },
            printGameOver
        );
        mainGame.start();
    })

    playAgainButton.addEventListener('click', () => {
        gameOverPage.style = 'display: none';
        gamePage.classList.add('show');
        gamePage.classList.remove('hide');

        const mainGame = new Game(
            {
                ctx1: ctx1,
                ctx2: ctx2,
                ctx3: ctx2,
                canvasWidth: waterLayer.width,
                canvasHeight: waterLayer.height,
                jabaliImg: jabaliImg,
                playerImgs: playerImgs,
                assasinImg: assasinImg,
                turtleImg: turtleImg,
                lifePreserverImg: lifePreserverImg,
                collisionImg : collisionImg,
                donutsImg: donutsImg,
                crashSound: crashSound,
                crunchSound: crunchSound,
                waterSplashSound: waterSplashSound,
                successSound: successSound,
                player: player = new Player(ctx2, cell,waterLayer.width, waterLayer.height),
                food: food = new Food(cell,waterLayer.width, waterLayer.height),
                cell: cell,
                obstacleConstructor: Obstacle,
                rightCarsImg: rightCarsImg,
                leftCarsImg: leftCarsImg,
                rightBoatsImg: rightBoatsImg,
                leftBoatsImg: leftBoatsImg,
            },
            printGameOver
        );
        mainGame.start();
    });
})
