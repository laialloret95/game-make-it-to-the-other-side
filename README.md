# Ironhack. Can you make it to the other side?


The purpose of the game is to cross all the terrains and get to the other side of the screen. Every time the player reaches the other side she scores and gets to the next level.

The player is represented by a women. She can move to all sides and has to:

1. Cross the road avoiding cars
2. Cross the river by jumping into different types of transports
3. Run trough the desert skipping enemies

The game ends when the player is:

1. Is hit by a car
2. Falls into the water and therefore sunks
3. Collides with an enemy

* * *
## MVP
### Technique
HTML5, Canvas, and Vanilla Javascript
### Game states
* __Start Screen__
  * Title
  * Play button
  * Setup Instructions
* __Game Screen__
  * Canvas
* __Game Over Screen__
  * Play again button

### Game
* Create interface
* Create player
* Move player
  * Press any arrow key for movement
* Create obstacles
* Check collision and overlap with water transports

## BACK LOG

* Add health to the player so that when a collision or sinking happens she loses health instead of reaching Game Over
* Throw food or make it appear randomly so that player can catch it and increase its health
* Change the background each time the player advances levels

## Data structure
__setup.js__

````
canvas variables;
global variables;
arrays;
canvas images;
````
__utilities.js__

````
keyboard event listeners;
function animateLoop();
function scored();
function showScoreBoard();
function collision();
function resetGame();
````
__player.js__

````
class Player {};
````
__obstacles.js__

````
class Obstacle {};
function initObstacles();
function handleObstacles();
````