"use strict";

/*****************/
// Pong game
// by Zahra Ahmadi
/***********************************************************************************************************/
//
// A "simple" implementation of Pong with a scoring system. Unlike the usual Pong games,
// the initial position of ball launch is random and every time, it launches toward the paddle that has won
// the most recent point. The players share one common score bar and they have to compite with each other
// to get more points.
// The winner is the one whose sum of points is more. The color of paddles correspond to the color of points
// so that players know which points belongs to them.
// The victory screen adjusts itself to the color of winner paddle.
// The number of points that the winner has won is also displayed on the screen.
// Up and down keys control the right hand paddle, W and S keys control
// the left hand paddle
// No external images or resources has been used to program this game
// (Except the ones that were put initially in the zip file).
//
/************************************************************************************************************/
// Whether the game has started
let playing = false;

// Show the start screen only at the start of game or once the button of restart is pressed
let startIt = false;

// Show the victory screen if one of the paddles won the game
let victory = false;

// Check who's won the last point, to set the ball launch direction
let ballRight = false;

// Game colors (using hexadecimal)
let bgColor = 0;
let fgColor = 255;

//VARIABLES DECLARATION
//
// BALL

// A ball object with the properties of
// position, size, velocity, speed and time
let ball = {
  x: 0,
  y: 0,
  size: 30,
  vx: 0,
  vy: 0,
  speed: 6,
  maxSpeed: 200,
  tx: 0,
  ty: 0,
}
// THE ENLARGING BALL

// The enlarging ball object (at the victory screen) with the properties of
// position, size, velocity, velocity of size changing, and time
let victoryBall = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  speed: 4,
  vw: 0,
  vh: 0,
  yt: 0,
  xt: 0
}
// PADDLES

// LEFT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, score tracker and speed
// And a boolean value that specifies if the left paddle won the game
let leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 6,
  upKey: 87,
  downKey: 83,
  Score: 0,
  Victory: false
}
// RIGHT PADDLE

// Basic definition of a right paddle object with its key properties of
// position, size, velocity, score tracker and speed
// And a boolean value that specifies if the right paddle won the game
let rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 6,
  upKey: 38,
  downKey: 40,
  Score: 0,
  Victory: false
}
// RIGHT PADDLES SCORE BAR PROPERTIES

// Right paddle score bar position, width and height, opacity
let scoreRight = {
  X: 0,
  Y: 0,
  W: 0,
  H: 0,
  Opacity: 0
}
// LEFT PADDLES SCORE BAR PROPERTIES

// Left paddle score bar position, width and height, opacity
let scoreLeft = {
  X: 0,
  Y: 0,
  W: 0,
  H: 0,
  Opacity: 0
}
// START BUTTON

// Start button with the properties of position, size
let startButton = {
  X: 0,
  Y: 0,
  Size: 0
};
// THE MIDDLE CIRCLE BACKGROUND ON START SCREEN

// The circle time, colors value
let startBg = {
  st: 0,
  co: 0,
  st2: 0,
  co2: 0,
  st3: 0,
  co3: 0,
  range: 5,
  col: 0,
  col2: 0,
  col3: 0
}
// RESTART BUTTON

// Restart button with the properties of position, size
let reset = {
  X: 0,
  Y: 0,
  Size: 0
};

// Set score bar properties like: position, width, opacity
let scoreBar;

// Sum of points
let groupScore;

// An array that is filled by true or false values to decides
// the most recent point belongs to which of the two paddles
let scoreMatcher;

// A variable to hold the beep sound we will play on bouncing
let beepSFX;

// VARIABLES ASSIGNMENT
//
// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for the paddles, ball, victory screen ball, score bar,
// start and restart buttons positions, velocities and other properties.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640, 480);
  rectMode(CENTER);
  noStroke();
  fill(fgColor);

  setupPaddles();
  setupBall();
  setupVicBall();
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
  leftPaddle.y = height - 50;

  // Initialise the right paddle position
  rightPaddle.x = width - rightPaddle.w;
  rightPaddle.y = height - 50;
}

// setupBall();
//
// Set up ball x and y positions time (for the noise() function)
function setupBall() {
  ball.tx = random(0, 100);
  ball.ty = random(0, 100);
}

// setupVicBall()
//
// Set up victory screen ball initial position, width and height, speed,
// volecity of size change and x and y positions times
function setupVicBall() {
  victoryBall.x = width / 2;
  victoryBall.y = height / 2;
  victoryBall.w = 100;
  victoryBall.h = 100;
  victoryBall.vw = victoryBall.speed;
  victoryBall.vh = victoryBall.speed;
  victoryBall.yt = random(0, 100);
  victoryBall.xt = random(0, 100);
}

// setupScore
//
// Sets the starting positions and sizes of the two paddle score bars
function setupScore() {
  scoreRight.X = width / 2;
  scoreRight.W = width / 2;
  scoreRight.H = height / 20;
  scoreLeft.X = width / 2;
  scoreLeft.W = width / 2;
  scoreLeft.H = height / 20;
  scoreBar = [{
      y: height - 30,
      w: width - 220,
      a: 45
    },
    {
      y: height - 60,
      w: width - 250,
      a: 59
    },
    {
      y: height - 90,
      w: width - 280,
      a: 73
    },
    {
      y: height - 120,
      w: width - 310,
      a: 87
    },
    {
      y: height - 150,
      w: width - 340,
      a: 101
    },
    {
      y: height - 180,
      w: width - 370,
      a: 115
    },
    {
      y: height - 210,
      w: width - 400,
      a: 143
    },
    {
      y: height - 240,
      w: width - 430,
      a: 157
    },
    {
      y: height - 270,
      w: width - 460,
      a: 171
    },
    {
      y: height - 300,
      w: width - 490,
      a: 185
    },
    {
      y: height - 330,
      w: width - 520,
      a: 199
    },
    {
      y: height - 360,
      w: width - 550,
      a: 213
    },
    {
      y: height - 390,
      w: width - 580,
      a: 227
    },
    {
      y: height - 420,
      w: width - 610,
      a: 241
    },
    {
      y: height - 450,
      w: width - 640,
      a: 255
    }
  ];
  groupScore = 0;
  scoreMatcher = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
}

// setupStart()
//
// Initialises start button position, size
function setupStart() {
  startButton.X = width / 2;
  startButton.Y = height - 140;
  startButton.Size = 50;
}

// setupStartBg()
//
// Initialises start screen middle circle times values
function setupStartBg() {
  startBg.st = random(0, 255);
  startBg.st2 = random(0, 255);
  startBg.st3 = random(0, 255);
}

// setupRestart()
//
// Initialises restart button position, size
function setupRestart() {
  reset.X = width / 2;
  reset.Y = height / 2 + 60;
  reset.Size = 50;
}

// CODE APPLICATION
//
// draw()
//
// Calls the appropriate functions to run the game
function draw() {
  // Fill the background
  background(bgColor);
  // If startIt is false show the start screen
  if (!startIt) {
    displayStart();
  }
  // If victory is true show the victory screen
  else if (victory) {
    displayVictoryScreen(rightPaddle.Victory);
    // If playing is true display the game
  } else if (playing) {
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    // Check if the ball collided the screen borders or the left or right paddles
    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);

    // Check if the ball went out of bounds and respond if so
    if (ballIsOutOfBounds()) {
      // If it went off either side, reset it
      resetBall();
    }

    // If groupScore is less than 15 keeps adding to the number of scores and don't stop the game
    if (groupScore < 15) {
      for (let i = 0; i < groupScore; i++) {
        // Draw paddles score bars
        displayScore(scoreMatcher[i], scoreBar[i]);
      }
    }
    // Else if the groupScore passed number 15, the game is over
    else {
      // if left paddle score is more, the winner is right paddle
      // otherwise the winner is left paddle
      if (leftPaddle.Score > rightPaddle.Score) {
        rightPaddle.Victory = true;
      } else if (leftPaddle.Score < rightPaddle.Score) {
        rightPaddle.Victory = false;
      }
      victory = true;
      playing = false;
    }

    // Display the paddles and ball
    push();
    fill(132, 12, 232);
    displayPaddle(leftPaddle);
    pop();

    push();
    fill(0, 255, 110);
    displayPaddle(rightPaddle);
    pop();

    displayBall();
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
    // If ball speed is more than 8, the paddle moves faster
    // otherwise keeps it's sprrd on the same level
    if (ball.speed > 8) {
      paddle.vy = -paddle.speed - 4;
    } else {
      paddle.vy = -paddle.speed;
    }
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    if (ball.speed > 8) {
      // If ball speed is more than 8, the paddle moves faster
      // otherwise keeps it's sprrd on the same level
      paddle.vy = paddle.speed + 4;
    } else {
      paddle.vy = paddle.speed;
    }
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
  // If the right paddle won the most recent point ,the launches toward that.
  // otherwise it launches towards the left paddle
  if (ballRight) {
    ball.x += ball.vx;
    ball.y += ball.vy;
  } else {
    ball.x -= ball.vx;
    ball.y += ball.vy;
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
    // Set the scoreMatcher value to true, in the index number that is given by the groupScore variable
    scoreMatcher[groupScore] = true;
    // Add one to the group score
    groupScore += 1;
    // If ball went of the right side, set ballRight to true
    ballRight = true;
    return true;
  } else if (ball.x > width) {
    // Add one to the score of left paddle score
    rightPaddle.Score++;
    // Set the scoreMatcher value to false, in the index number that is given by the groupScore variable
    scoreMatcher[groupScore] = false;
    // Add one to the group score
    groupScore += 1;
    // If ball went of the left side, set ballRight to false
    ballRight = false;
    return true;
  } else {
    return false;
  }
}

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
    beepSFX.currentTime = 0;
    beepSFX.play();
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
      beepSFX.currentTime = 0;
      beepSFX.play();
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
// Draws the ball on screen as an ellipse
function displayBall() {
  // Draw the ball
  push();
  fill("#FFE900");
  ellipse(ball.x, ball.y, ball.size, ball.size);
  pop();

}

// displayVicBall()
//
// Display the enlarging ball on the victory screen
function displayVicBall() {
  ellipse(victoryBall.x, victoryBall.y, victoryBall.w, victoryBall.h);
}

// displayScore();
//
// display the two paddle score at the middle of screen
function displayScore(scoreMatch, scorePositions) {
  let paddleRY = scorePositions.y;
  let paddleRW = scorePositions.w;
  let scoreOp = scorePositions.a;
  // If scoreMatch is true, add to the right paddle score
  if (scoreMatch) {
    push();
    fill(0, 255, 110, scoreOp);
    rectMode(CENTER);
    rect(scoreLeft.X, paddleRY, paddleRW, scoreLeft.H);
    pop();
    console.log(paddleRY);
  }
  // otherwise add to the left paddle score
  else {
    console.log(scoreMatch);
    push();
    fill(132, 12, 232, scoreOp);
    rectMode(CENTER);
    rect(scoreLeft.X, paddleRY, paddleRW, scoreLeft.H);
    pop();
  }

}

// displayVictoryScreen()
//
// Display the victory screen once the number of bars passes 14
function displayVictoryScreen(checkVictoryCol) {
  let checkColor = checkVictoryCol;
  background(0);

  // Set the victory ball speed
  vicBallSpeed();
  // If the checkColor is true, set the score bar color to green
  if (checkColor) {
    push();
    fill(0, 255, 110);
    displayVicBall();
    pop();
  }
  // otherwise set it to purple
  else {
    push();
    fill(132, 12, 232);
    displayVicBall();
    pop();
  }

  push();
  fill(0);
  textAlign(CENTER);
  textFont("calibri");
  // If left paddle score is more than right side, display the victory message and the sum of right paddle score
  if (leftPaddle.Score > rightPaddle.Score) {
    push();
    textSize(victoryBall.w / 10);
    text("I knew green wins!", width / 2, height / 3 + 40);
    textSize(victoryBall.w / 14);
    text(`Your score: ${leftPaddle.Score}`, width / 2, height / 3 + 95);
    pop();
  }
  // otherwise display the left paddle victory message and sum of score
  else if (leftPaddle.Score < rightPaddle.Score) {
    push();
    textSize(victoryBall.w / 10);
    text("I knew purple wins!", width / 2, height / 3 + 40);
    textSize(victoryBall.w / 14);
    text(`Your score: ${rightPaddle.Score}`, width / 2, height / 3 + 95);
    pop();
  }
  // draw and read restart button
  drawRestart();
  pop();
}

// resetBall()
//
// Sets the starting position and velocity of the ball
function resetBall() {

  // Initialise the ball's position
  ball.x = random(220, width - 220);
  ball.y = random(140, height - 140);

  // Fluctuates the volecity of ball speed in a reasonable range
  ball.speed = random(6, 10);;
  ball.speed = constrain(ball.speed, 0, ball.maxSpeed);
  ball.vx = ball.speed;
  ball.vy = ball.speed;
  // Reset paddles postion
  setupPaddles();
}

// vicBallSpeed()
//
// Sets the starting position and velocity of victory screen ball
function vicBallSpeed() {

  // Keeps the enlarging ball inside the borders of screen
  if (victoryBall.w < 50 || victoryBall.w > width - 50 || victoryBall.h < 50 || victoryBall.h > height - 50) {
    victoryBall.xt = random(0, 100);
  } else {

    // Initialise the ball's velocity
    victoryBall.vw = map(noise(victoryBall.xt), 0, 1, 2, victoryBall.speed);
    victoryBall.vh = map(noise(victoryBall.xt), 0, 1, 2, victoryBall.speed);

    victoryBall.w += victoryBall.vw;
    victoryBall.h += victoryBall.vh;

    // Add to the ball's time
    victoryBall.xt += 0.0001;
  }
}

// drawStart()
//
// Draw start button
function drawStart() {
  push();
  textAlign(CENTER, CENTER);
  textSize(30);
  text("CLICK TO START", startButton.X, startButton.Y);
  pop();
}

// drawRestart()
//
// Draw restart button
function drawRestart() {
  push();
  textAlign(CENTER, CENTER);
  textSize(victoryBall.h / 13);
  text("CLICK TO START AGAIN", reset.X, reset.Y);
  pop();
}

// displayStart()
//
// Display the start screen
function displayStart() {
  // Give the middle circle random colors
  startBg.co = map(noise(startBg.st), 0, 1, 0, startBg.range);
  startBg.co2 = map(noise(startBg.st2), 0, 1, 0, startBg.range);
  startBg.co3 = map(noise(startBg.st3), 0, 1, 0, startBg.range);

  startBg.col += startBg.co;
  startBg.col2 += startBg.co2;
  startBg.col3 += startBg.co3;

  startBg.st += 0.1;
  startBg.st2 += 0.001;
  startBg.st3 += 0.01;

  // Draw the middle circle
  push();
  fill(startBg.col, startBg.col2, startBg.col3);
  ellipse(width / 2, height / 2, width - 200, width - 200);
  pop()
  push();
  // If background color of the circle was black, set the text color to white
  if (startBg.col < 0) {
    fill(255);
  } else {
    fill(0);
  }

  // Set up the font
  textSize(40);
  textAlign(CENTER, CENTER);
  // Set up the text to display
  let startText = "Hi buddy!!";
  text(startText, width / 2, height / 3 - 10);
  textAlign(LEFT);
  textSize(16);
  let startIns = "INSTRUCTION: \n1. Your score bars color is same as your paddle color.\n" +
    "2. When you win a point, the ball launches toward your\n" + "paddle.\n" +
    "3. The game ends when the sum of scores equals 15.\n" +
    "4. The winner is the one who's won more points."; // \n means "new line"
  text(startIns, width / 5, height / 3 + 80);
  // Draw start button
  drawStart();
  pop();

}

// start()
//
// Start the game
function start() {
  // If the distance between mouse position and
  // the start button was less than the button size rest the following values and functions
  if (dist(mouseX, mouseY, startButton.X, startButton.Y) < startButton.Size / 2) {
    playing = true;
    startIt = true;
    leftPaddle.Score = 0;
    rightPaddle.Score = 0;
    setupVicBall();
    setupRestart();
  }
}

// restart()
//
// Restart the game
function restart() {
  // If the distance between mouse position and
  // the restart button was less than the button size rest the following values and functions
  if (dist(mouseX, mouseY, reset.X, reset.Y) < reset.Size / 2) {
    startIt = false;
    victory = false;
    leftPaddle.Score = 0;
    rightPaddle.Score = 0;
    setupPaddles();
    setupScore();
    resetBall();
  }
}

// mousePressed()
//
// Here to require a click to start playing the game or to restart
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  if (!startIt) {
    start();
  } else if (victory) {
    restart();
  }
}
