"use strict";

// Pong
// by Pippin Barr
//
// A "simple" implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Up and down keys control the right hand paddle, W and S keys control
// the left hand paddle

// Whether the game has started
let playing = false;
let startIt = false;
// Game colors (using hexadecimal)
let bgColor = 0;
let fgColor = 255;

// BALL

// A ball object with the properties of
// position, size, velocity, and speed
let ball = {
  x: 0,
  y: 0,
  size: 20,
  vx: 0,
  vy: 0,
  speed: 6,
  maxSpeed: 200,
  tx: 0,
  ty: 0,
}

// PADDLES

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 87,
  downKey: 83,
  Score: 0,
  Victory: false
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 38,
  downKey: 40,
  Score: 0,
  Victory: false
}

// Right paddle score bar position, width and height, opacity
let scoreRight = {
  X: 0,
  Y: 0,
  W: 0,
  H: 0,
  Opacity: 0
}

// Right paddle score bar position, width and height, opacity
let scoreLeft = {
  X: 0,
  Y: 0,
  W: 0,
  H: 0,
  Opacity: 0
}

let reset = {
  X: 0,
  Y: 0,
  Size: 0
};

let scorePosition;
// A variable to hold the beep sound we will play on bouncing
let groupScore;
let beepSFX;

let victory = false;
let scoreMatcher;

let speedReset;
let speed;
let ballRight = false;
// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640, 480);
  rectMode(CENTER);
  noStroke();
  fill(fgColor);

  setupPaddles();
  setupBall();
  setupScore();
  setupRestart();
  setupStart();
  resetBall();
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 + leftPaddle.w;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = width - rightPaddle.w;
  rightPaddle.y = height / 2;
}

function setupBall(){
  ball.tx = random(0, 100);
  ball.ty = random(0, 100);
}
// setupScore
//
// Sets the starting positions and sizes of the two paddle scores
function setupScore() {
  scoreRight.X = width / 2;
  scoreRight.W = width / 2;
  scoreRight.H = height / 20;
  scoreLeft.X = width / 2;
  scoreLeft.W = width / 2;
  scoreLeft.H = height / 20;
  scorePosition = [
    {
      y: height - 30,
      a: 45
    },
    {
      y: height - 60,
      a: 59
    },
    {
      y: height - 90,
      a: 73
    },
    {
      y: height - 120,
      a: 87
    },
    {
      y: height - 150,
      a: 101
    },
    {
      y: height - 180,
      a: 115
    },
    {
      y: height - 210,
      a: 143
    },
    {
      y: height - 240,
      a: 157
    },
    {
      y: height - 270,
      a: 171
    },
    {
      y: height - 300,
      a: 185
    },
    {
      y: height - 330,
      a: 199
    },
    {
      y: height - 360,
      a: 213
    },
    {
      y: height - 390,
      a: 227
    },
    {
      y: height - 420,
      a: 241
    },
    {
      y: height - 450,
      a: 255
    }
  ];
  groupScore = 0;
  scoreMatcher = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
}

// setupRestart()
//
// Initialises restart button position, size
function setupRestart(){
  reset.X = width/2;
  reset.Y = height/2 + 50;
  reset.Size = 50;
}
function setupStart(){
  reset.X = width/2;
  reset.Y = height/2 + 50;
  reset.Size = 50;
}

// draw()
//
// Calls the appropriate functions to run the game
// See how tidy it looks?!
function draw() {
  // Fill the background
  background(bgColor);
  if (!startIt){
    displayStart();
  }
  else if (victory) {
    displayVictoryScreen(rightPaddle.Victory);
    // Display the message to start the game
  } else if (playing) {
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);

    // Check if the ball went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (ballIsOutOfBounds()) {

      // If it went off either side, reset it
      resetBall();
      // This is where we would likely count points, depending on which side
      // the ball went off...
    }

    // If group score is less than 16 keeps adding to the number of scores and don't stop the game
    if (groupScore < 16) {
      for (let i = 0; i < groupScore; i++) {
        displayScore(scoreMatcher[i], scorePosition[i]);
      }
    }
    // Else if the score passed number 16, the game is over and left paddle is the winner
    else {
      // if left paddle score is more than the right paddle, the winner is right paddle
      // otherwise the winner is left paddle
      if (leftPaddle.Score > rightPaddle.Score) {
        rightPaddle.Victory = true;
      }
      victory = true;
      playing = false;

    }

    // We always display the paddles and ball so it looks like Pong!
    displayPaddle(leftPaddle);
    displayPaddle(rightPaddle);
    displayBall();
  }
  else {
    // Otherwise we display the message to start the game
    displayGameOver();
  }
}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  } else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and ball based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  paddle.y += paddle.vy;
}

// updateBall()
//
// Sets the position of the ball based on its velocity
function updateBall() {
  // Update the ball's position based on velocity
  // If the ball went out of the left side of screen, it launchs toward the right paddle that won the most recent point.
  // If the ball went out of the right side of screen, it launchs toward the left paddle that won the most recent point.
  if (ballRight){
    ball.x += ball.vx;
    ball.y += ball.vy;
  }
  else {
    ball.x -= ball.vx;
    ball.y -= ball.vy;
  }
}

// ballIsOutOfBounds()
//
// Checks if the ball has gone off the left or right
// Returns true if so, false otherwise
function ballIsOutOfBounds() {
  // Check for ball going off the sides
  if (ball.x < 0) {
    // Add one to the score of right paddle score
    leftPaddle.Score++;
    // Set the scoreMatcher value to true in the index number that is given by the groupScore variable
    scoreMatcher[groupScore] = true;
    groupScore += 1;
    ballRight = true;
    return true;
  }
  else if (ball.x > width) {
    // Add one to the score of left paddle score
    rightPaddle.Score++;
    // Set the scoreMatcher value to false in the index number that is given by the groupScore variable
    scoreMatcher[groupScore] = false;
    groupScore += 1;
    ballRight = false;
    return true;
  }
  else {
    return false;
  }
}

// function checkScore() {
//
// }
// checkBallWallCollision()
//
// Check if the ball has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (ball.y < 0 || ball.y > height) {
    // It hit so reverse velocity
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    // beepSFX.currentTime = 0;
    // beepSFX.play();
  }
}

// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the ball and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ballTop = ball.y - ball.size / 2;
  let ballBottom = ball.y + ball.size / 2;
  let ballLeft = ball.x - ball.size / 2;
  let ballRight = ball.x + ball.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  // First check the ball is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      ball.vx = -ball.vx;
      // Play our bouncing sound effect by rewinding and then playing
      // beepSFX.currentTime = 0;
      // beepSFX.play();
    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle(paddle) {
  // Draw the paddles
  rect(paddle.x, paddle.y, paddle.w, paddle.h);
}

// displayBall()
//
// Draws the ball on screen as a square
function displayBall() {
  // Draw the ball
  rect(ball.x, ball.y, ball.size, ball.size);
}
// displayScore();
//
// display the two paddle score at the middle of screen
function displayScore(scoreMatch, scorePositions) {
  let paddleRY = scorePositions.y;
  let scoreOp = scorePositions.a;
  // If scoreMatch is true, add to the right paddle score
  if (scoreMatch) {
    push();
    fill(0, 255, 110, scoreOp);
    rectMode(CENTER);
    rect(scoreLeft.X, paddleRY, scoreLeft.W, scoreLeft.H);
    pop();
    console.log(paddleRY);
  }
  // otherwise add to the left paddle score
  else {
    console.log(scoreMatch);
    push();
    fill(132, 12, 232, scoreOp);
    rectMode(CENTER);
    rect(scoreLeft.X, paddleRY, scoreLeft.W, scoreLeft.H);
    pop();
  }

}

// displayVictoryScreen()
//
// Display the victory screen once the number of bars in either side passes 16
function displayVictoryScreen(checkVictoryCol) {
  let checkColor = checkVictoryCol;
  if (checkColor) {
    background(0, 255, 110);
  }
  else {
    background(132, 12, 232);
  }
  push();
  fill(0);
  textAlign(CENTER);
  textSize(30);
  text("I knew you win!", width / 2, height / 3);
  drawRestart();
  pop();
}

//
// function controlBallSpeed() {
//   if (groupScore < 7){
//     let r = random(1, 5);
//     ball.speed = ball.speed + r;
//     ball.speed = constrain(ball.speed, 10, ball.maxSpeed);
//   }
//   else {
//     // let r = random(5, 10);
//     ball.speed = ball.speed + random(1, 5);;
//     ball.speed = constrain(ball.speed, 10, ball.maxSpeed);
//   }
// }

// resetBall()
//
// Sets the starting position and velocity of the ball
function resetBall() {

  // Initialise the ball's position and velocity
  ball.x = random(200, width-200);
  ball.y = random(100, height-100);

  //
  ball.speed = random(4, 8);;
  ball.speed = constrain(ball.speed, 0, ball.maxSpeed);
  ball.vx = ball.speed;
  ball.vy = ball.speed;
}

// drawStart()
//
// Draw start button
function drawStart() {

  push();
  textAlign(CENTER, CENTER);
  textSize(32);
  text("CLICK TO START", reset.X, reset.Y);
  pop();
}

// drawRestart()
//
// Draw restart button
function drawRestart() {

  push();
  textAlign(CENTER, CENTER);
  textSize(32);
  text("CLICK TO START AGAIN", reset.X, reset.Y);
  pop();
}

// displayStart()
//
// Display start screen
function displayStart() {
  push();
  background("#E84D53");
  // Set up the font
  textSize(25);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let startText = "Hello buddy!!"; // \n means "new line"
  text(startText, width/2, height/2);
  drawStart();
  pop();
}

// displayGameOver()
//
// Display game over screen
function displayGameOver(){
  push();
  background("#E84D53");
  // Set up the font
  textSize(25);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = "GAME OVER\n";
  text(gameOverText, width/2, height/3);
  pop();
  drawRestart();

}

// start()
//
// Start the game
function start() {
  if (dist(mouseX, mouseY, reset.X, reset.Y) < reset.Size){
  playing = true;
  startIt = true;
  // victory = false;
  }
}

// restart()
//
// Restart the game
function restart() {
  if (dist(mouseX, mouseY, reset.X, reset.Y) < reset.Size){
  startIt = false;
  victory = false;
  setupPaddles();
  setupScore();
  resetBall();
  }
}


// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  if (!startIt){
    start();
  }
  else if (victory){
    restart();
  }
}






// // If right paddle score is less than 16, adds to the number of bars
// if (leftPaddle.Score < 16){
//   for(let i = 0; i < leftPaddle.Score; i++){
//     displayRightScore(scorePosition[i]);
//     if (leftPaddle.Score === 15){
//       rightPaddle.Victory = true;
//     }
//   }
// }
// // Else if the score passed number 16, the game is over and right paddle is the winner
// else {
//   victory = true;
//   playing = false;
// }
// // If left paddle score is less than 16, adds to the number of bars
// if (rightPaddle.Score < 16 ) {
//   for(let j = 0; j < rightPaddle.Score; j++){
//     displayLeftScore(scorePosition[j]);
//     if (rightPaddle.Score === 15){
//       leftPaddle.Victory = true;
//     }
//   }
// }
// // Else if the score passed number 16, the game is over and left paddle is the winner
// else {
//   victory = true;
//   playing = false;
// }

// if (groupScore < 16){
//       for(let j = 0; j < groupScore; j+= rightPaddle.Score){
//           displayLeftScore(scorePosition[j]);
//         if (rightPaddle.Score === 15){
//           leftPaddle.Victory = true;
//         }
//       }
//       for(let j = 0; j < groupScore; j++){
//           displayRightScore(scorePosition[leftPaddle.Score]);
//             if (leftPaddle.Score === 15){
//               rightPaddle.Victory = true;
//             }
//           }
//         }
//         // Else if the score passed number 16, the game is over and left paddle is the winner
//         else {
//           victory = true;
//           playing = false;
//         }

// for(let j = 0; j < groupScore; j++){
//     if (j === rightPaddle.Score){
//
//       // positionNumber[j] = groupScore;
//     }
//     else if (j === leftPaddle.Score){
//       scoreMatcher[j] = false;
//       // positionNumber[j] = leftPaddle.Score;
//     }
//   }



// // displayRightScore()
// //
// // Display right paddle score
// function displayRightScore(scorePositions) {
//     push();
//     let paddleRY = scorePositions.y;
//     let scoreOp = scorePositions.a;
//     fill(0, 255, 110, scoreOp);
//     rectMode(CORNER);
//     rect(scoreRight.X, paddleRY, scoreRight.W, scoreRight.H);
//     pop();
// }
//
// // displayLeftScore()
// //
// // Display left paddle score
// function displayLeftScore(scorePositions) {
//     push();
//     let paddleLY = scorePositions.y;
//     let scoreOp = scorePositions.a;
//     fill(132, 12, 232);
//     rectMode(CORNER);
//     rect(scoreLeft.X, paddleLY, scoreLeft.W, scoreLeft.H);
//     pop();
// }
