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

// Declare paddle object
let paddle;

// Declare ball object
let ball;

let targets = [];
let maxTarget = 50;
let targetProperties = [];
let targetsLost = 0;
let d;
// Declare barriers array
let barriers = [];
let MAX_BARRIERS = 5;

// Decides whether to show targets or not.
let show = 1;
let hide = 2;

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

  // Targets drawing code was borrowed from:
  // <Daniel Shiffman> (<15/March/2016>) <Random Circles with No Overlap> (https://www.youtube.com/watch?v=XATr_jdh-44).
  for (let i = 0; i < maxTarget; i++) {
    // Declare and assign random positions and sizes
    let target = {
      x: random(100, width - 100),
      y: random(0, (height / 2 + 100)),
      radius: random(20, 80)
    };
    // To check whether the two circles overlapped.
    let overlapping = false;
    // Check the distance between the new circle and all the old ones.
    // If the distance between the two is less than sum of both circles radius,
    // don't add the new circle to the array.
    for (let i = 0; i < targetProperties.length; i++) {
      let other = targetProperties[i];
      let d = dist(target.x, target.y, other.x, other.y);
      if (d < (target.radius + other.radius) / 2) {
        overlapping = true;
        break;
      }
    }
    // If is not overlapping add to the array
    if (!overlapping) {
      targetProperties.push(target);
    }
  }
  // Makes new target objects and assign target properties to
  for (let i = 0; i < targetProperties.length; i++) {
    targets[i] = new Target(targetProperties[i].x, targetProperties[i].y, targetProperties[i].radius);
  }

  // Makes an array of barrier objects and assign random default values to objects
  // for (let i = 0; i < MAX_BARRIERS; i++) {
  //   barriers[i] = new BarrierStraight(i * 75.0, random(height / 2, height - 100));
  // }

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

    // Resets paddle position and define play area
    if (mouseY > (height / 2 + 200) && mouseY < (height)) {
      paddle.x = mouseX;
      paddle.y = mouseY;
    }

    // Displays play area
    gameStructure.playArea();
    // Displays targets (makes the targets blink)
    for (let i = 0; i < targets.length; i++) {
      let r = floor(random(1, 3));
      if (r === show) {
        targets[i].display();
      }
    }

    // // Displays barriers
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

    // Updates target health. reduces health based on a random speed
    // for (let i = 0; i < targets.length; i++) {
    //   targets[i].updateHealth();
    // }

    // Displays Ball and paddle
    paddle.display();
    ball.display();

    // Check if all targets disappeared.
    for (let i = 0; i < targets.length; i++) {
      if (targets[i].health < 5) {
        targetsLost++;
      }
    }

    // If ball goes off the bottom of screen or all targets disappeared, game is over.
    if (ball.y > height || targetsLost === 50) {
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
// (Borrowed from my second project)
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
//(Borrowed from my second project)
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
