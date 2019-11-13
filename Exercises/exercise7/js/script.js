// Pong Simulation
// by Zahra Ahmadi

/****************************************************************************/

/****************************************************************************/
//
//
/****************************************************************************/
// Reference
//
// --** Images **--


// --** Audios **--
//
/****************************************************************************/

// Decides when to show start screen, game screen, end screen
let gameStart = false;
let startScreen = true;
let gameOver = false;

// Declare barriers array
let barriers = [];
let MAX_BARRIERS = 5;

// Declare paddle object
let paddle;

// Declare ball object
let ball;

// setup()
//
// Sets up all intial values
function setup() {
  createCanvas(windowWidth, windowHeight - 5);
  setUpGame();
}

// setUpGame
//
// Sets up all initial values in an independent function so that it can be used in functions like restart function.
function setUpGame() {

  // Makes an object of gameStructure and assign default values to
  gameStructure = new GameStructure(width / 2, height / 2.5, width / 2, height / 2.5);

  // Makes an array of barrier objects and assign random default values to objects
  for (let i = 0; i < MAX_BARRIERS; i++) {
    barriers[i] = new BarrierStraight(i * 75.0, random(height / 2, height - 100));
  }

  // Makes ball object and assign default values to
  ball = new BallStraight(width / 2 + 50, height - 70);
  // Makes paddle object and assign default values to
  paddle = new PaddleStraight(width / 2, height - 50);
}

// draw()
//
// Handles and displays all game elements
function draw() {
  // Start screen
  if (startScreen) {
    background(255);
    gameStructure.startScreenDisplay();
  }
  // Game screen
  else if (gameStart) {
    background(0);

    // Resets paddle position
    paddle.x = mouseX;
    paddle.y = mouseY;

    // // Display barriers
    // for (let i = 0; i < barriers.length; i++) {
    //   barriers[i].display();
    // }

    // Handles ball input
    ball.handleInput();

    // Check if ball is jumping
    if (ball.isJumping === true) {
      // it is not falling
      ball.isFalling = false;
      // increase the y Speed of ball
      ball.ySpeed += 1;
      // update its y position
      ball.y += ball.ySpeed;

      // Check if is jumping and collided with paddle - then stop jumping.
      if (paddle.collidesWithBall(ball)) {

        ball.y = paddle.y - 12;
        ball.ySpeed = 0;
        ball.isJumping = false;
        ball.isFalling = false;
        // Ball jumps
        ball.goJump();
      }
    } else {
      ball.y = paddle.y - 12;
    }
    // Updates ball position based on paddle position
    ball.updatePosition(paddle.x + 50);

    // Displays Ball and paddle
    paddle.display();
    ball.display();

    console.log(ball.y);

    // If ball goes off the screen, game is over.
    if (ball.y > height) {
      gameOver = true;
      gameStart = false;
    }
  }
  // Game over screen
  else if (gameOver) {
    background(0);
    gameStructure.gameOverDisplay();
  }
}

// start()
//
// Start the game
function play() {
  // If the distance between mouse position and
  // the start button is less than the button size reset the following values.
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
  // the restart button is less than the button size reset the following values.
  if (dist(mouseX, mouseY, gameStructure.restartButton.x, gameStructure.restartButton.y) < gameStructure.restartButton.w) {
    startScreen = true;
    gameStart = false;
    gameOver = false;
    setUpGame();
  }
}

// If mouse is pressed apply the following code.
function mousePressed() {
  if (startScreen) {
    play();
  } else if (gameStart) {
    ball.isJumping = true;
  } else if (gameOver) {
    restart();
  }
}