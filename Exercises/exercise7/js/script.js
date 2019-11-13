let gameStart = false;
let startScreen = true;
let gameOver = false;
let barriers = [];
let MAX_BARRIERS = 5;

let paddle;
let player;

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight - 5);
  setUpGame();
}

function setUpGame() {

  gameStructure = new GameStructure(width / 2, height / 2.5, width / 2, height / 2.5);

  for (let i = 0; i < MAX_BARRIERS; i++) {
    barriers[i] = new BarrierStraight(i * 75.0, random(height / 2, height - 100));
  }

  player = new PlayerStraight(width / 2 + 50, height - 70);
  paddle = new PaddleStraight(width / 2, height - 50);
}

function draw() {
  if (startScreen) {
    background(255);
    gameStructure.startScreenDisplay();
  } else if (gameStart) {
    background(0);

    // Reset paddle position
    paddle.x = mouseX;
    paddle.y = mouseY;

    // // Display barriers
    // for (let i = 0; i < barriers.length; i++) {
    //   barriers[i].display();
    // }

    // player handle input
    player.handleInput();

    //if player is jumping
    if (player.isJumping === true) {
      // it is not falling
      player.isFalling = false;
      // increase the y Speed of player
      player.ySpeed += 1;
      // update its y
      player.y += player.ySpeed;

      // if is jumping and collided with paddle - then stop jumping.
      if (paddle.collidesWithPlayer(player)) {

        player.y = paddle.y - 12;
        player.ySpeed = 0;
        player.isJumping = false;
        player.isFalling = false;

        
        player.goJump();
      }

    } else {
      player.y = paddle.y - 12;
    }

    paddle.display();
    player.updatePosition(paddle.x + 50);
    player.display();

    console.log(player.y);

    // put drawing code here
    if (player.y > height) {
      gameOver = true;
      gameStart = false;
    }
  } else if (gameOver) {
    background(0);
    gameStructure.gameOverDisplay();
  }
}
// start()
//
// Start the game
function play() {
  // If the distance between mouse position and
  // the start button was less than the button size reset the following values.
  if (dist(mouseX, mouseY, gameStructure.playButton.x, gameStructure.playButton.y) < gameStructure.playButton.w) {
    gameStart = true;
    startScreen = false;
  }
}

// restart()
//
// Restart the game()
function restart() {
  // If the distance between mouse position and
  // the restart button was less than the button size reset the following values.
  if (dist(mouseX, mouseY, gameStructure.restartButton.x, gameStructure.restartButton.y) < gameStructure.restartButton.w) {
    startScreen = true;
    gameStart = false;
    gameOver = false;
    setUpGame();
  }
}

function mousePressed() {
  if (startScreen) {
    play();
  } else if (gameStart) {
    player.isJumping = true;
  } else if (gameOver) {
    restart();
  }
}
