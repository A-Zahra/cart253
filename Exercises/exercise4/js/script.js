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
// The start screen also has random colors that every time the player reloads the page a new color emerges on the screen.
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
  speed: 8,
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
  speed: 8,
  upKey: 38,
  downKey: 40,
  Score: 0,
  Victory: false
}

// START BUTTON

// Start button with the properties of position, size
let startButton = {
  x: 0,
  y: 0,
  Size: 0,
  textSize: 24
};
// THE MIDDLE CIRCLE BACKGROUND ON START SCREEN

// The circle times, velocities and colors value
// The start screen text size and position
// The start screen welcome and description position
let startBg = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  insX: 0,
  insY: 0,
  titleX: 0,
  titleY: 0,
  // Velocity of colors shade variation
  vcsv: 0,
  vcsv2: 0,
  vcsv3: 0,
  range: 5,
  // The variables that are put in the place of rgb colors in the fill function
  col: 0,
  col2: 0,
  col3: 0,
  st: 0,
  st2: 0,
  st3: 0
}
// RESTART BUTTON

// Restart button with the properties of position, size
let reset = {
  x: 0,
  y: 0,
  Size: 0
};
// VICTORY TEXT

// Victory text properties
let vicText = {
  size: 0,
  x: 0,
  y: 0
}
// Set score bar properties like: position, width and height, opacity
let scoreBar;
// Score text size and y position on the victory scene
let scoreTextS;
let scoreTextY;
// Sum of points
let groupScore;
// Paddle maximum speed
let paddleMaxSpeed;
// Ball speed over average
let ballAverage;
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
  setupStartBg();
  resetBall();
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 + leftPaddle.w;
  leftPaddle.y = height - 70;

  // Initialise the right paddle position
  rightPaddle.x = width - rightPaddle.w;
  rightPaddle.y = height - 70;

  paddleMaxSpeed = 4;
}

// setupBall();
//
// Set up ball x and y positions time (for the noise() function)
function setupBall() {
  ball.tx = random(0, 100);
  ball.ty = random(0, 100);
  ballAverage = 8;
}

// setupVicBall()
//
// Set up victory screen ball initial position, width and height, speed,
// velocity of size change and x and y positions times
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
  scoreBar = [{
      y: height - 30,
      x: width / 2,
      w: width - 220,
      h: height / 20,
      a: 45
    },
    {
      y: height - 60,
      x: width / 2,
      w: width - 250,
      h: height / 20,
      a: 59
    },
    {
      y: height - 90,
      x: width / 2,
      w: width - 280,
      h: height / 20,
      a: 73
    },
    {
      y: height - 120,
      x: width / 2,
      w: width - 310,
      h: height / 20,
      a: 87
    },
    {
      y: height - 150,
      x: width / 2,
      w: width - 340,
      h: height / 20,
      a: 101
    },
    {
      y: height - 180,
      x: width / 2,
      w: width - 370,
      h: height / 20,
      a: 115
    },
    {
      y: height - 210,
      x: width / 2,
      w: width - 400,
      h: height / 20,
      a: 143
    },
    {
      y: height - 240,
      x: width / 2,
      w: width - 430,
      h: height / 20,
      a: 157
    },
    {
      y: height - 270,
      x: width / 2,
      w: width - 460,
      h: height / 20,
      a: 171
    },
    {
      y: height - 300,
      x: width / 2,
      w: width - 490,
      h: height / 20,
      a: 185
    },
    {
      y: height - 330,
      x: width / 2,
      w: width - 520,
      h: height / 20,
      a: 199
    },
    {
      y: height - 360,
      x: width / 2,
      w: width - 550,
      h: height / 20,
      a: 213
    },
    {
      y: height - 390,
      x: width / 2,
      w: width - 580,
      h: height / 20,
      a: 227
    },
    {
      y: height - 420,
      x: width / 2,
      w: width - 610,
      h: height / 20,
      a: 241
    },
    {
      y: height - 450,
      x: width / 2,
      w: width - 640,
      h: height / 20,
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
  startButton.x = width / 2;
  startButton.y = height - 140;
  startButton.Size = 50;
}

// setupStartBg()
//
// Initialises start screen middle circle times values
function setupStartBg() {
  startBg.st = random(0, 255);
  startBg.st2 = random(0, 255);
  startBg.st3 = random(0, 255);
  startBg.x = width / 2;
  startBg.y = height / 2;
  startBg.w = width - 200;
  startBg.h = width - 200;
  startBg.insX = width / 5;
  startBg.insY = height / 3 + 80;
  startBg.titleX = width / 2;
  startBg.titleY = height / 3 - 15;

}

// setupRestart()
//
// Initialises restart button position, size
function setupRestart() {
  reset.x = width / 2;
  reset.y = height / 2 + 60;
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
    if (ball.speed > ballAverage) {
      paddle.vy = -paddle.speed - paddleMaxSpeed;
    } else {
      paddle.vy = -paddle.speed;
    }
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    if (ball.speed > ballAverage) {
      // If ball speed is more than 8, the paddle moves faster
      // otherwise keeps it's sprrd on the same level
      paddle.vy = paddle.speed + paddleMaxSpeed;
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


// resetBall()
//
// Sets the starting position and velocity of the ball
function resetBall() {

  // Initialise the ball's position
  ball.x = random(220, width - 220);
  ball.y = random(140, height - 140);

  // Fluctuates the velocity of ball speed in a reasonable range
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
  let paddley = scorePositions.y;
  let paddlex = scorePositions.x;
  let paddlew = scorePositions.w;
  let paddleh = scorePositions.h;
  let scoreOp = scorePositions.a;
  // If scoreMatch is true, add to the right paddle score
  if (scoreMatch) {
    push();
    fill(0, 255, 110, scoreOp);
    rectMode(CENTER);
    rect(paddlex, paddley, paddlew, paddleh);
    pop();
  }
  // otherwise add to the left paddle score
  else {
    console.log(scoreMatch);
    push();
    fill(132, 12, 232, scoreOp);
    rectMode(CENTER);
    rect(paddlex, paddley, paddlew, paddleh);
    pop();
  }

}

// displayVictoryScreen()
//
// Display the victory screen once the number of bars passes 14
function displayVictoryScreen(checkVictoryCol) {
  let checkColor = checkVictoryCol;
  // Victory text size and position
  vicText.size = victoryBall.w / 10;
  vicText.x = width / 2;
  vicText.y = height / 3 + 40;
  scoreTextS = victoryBall.w / 14;
  scoreTextY = height / 3 + 95;
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
    textSize(vicText.size);
    text("I knew green wins!", vicText.x, vicText.y);
    textSize(scoreTextS);
    text(`Your score: ${leftPaddle.Score}`, vicText.x, scoreTextY);
    pop();
  }
  // otherwise display the left paddle victory message and sum of score
  else if (leftPaddle.Score < rightPaddle.Score) {
    push();
    textSize(vicText.size);
    text("I knew purple wins!", vicText.x, vicText.y);
    textSize(scoreTextS);
    text(`Your score: ${rightPaddle.Score}`, vicText.x, scoreTextY);
    pop();
  }
  // draw and read restart button
  drawRestart();
  pop();
}

// drawStart()
//
// Draw start button
function drawStart() {
  push();
  textAlign(CENTER, CENTER);
  textSize(startButton.textSize);
  text("CLICK TO START", startButton.x, startButton.y);
  pop();
}

// drawRestart()
//
// Draw restart button
function drawRestart() {
  push();
  textAlign(CENTER, CENTER);
  textSize(scoreTextS);
  text("CLICK TO START AGAIN", reset.x, reset.y);
  pop();
}

// displayStart()
//
// Display the start screen
function displayStart() {
  // velocity of colors shade variation
  startBg.vcsv = map(noise(startBg.st), 0, 1, 0, startBg.range);
  startBg.vcsv2 = map(noise(startBg.st2), 0, 1, 0, startBg.range);
  startBg.vcsv3 = map(noise(startBg.st3), 0, 1, 0, startBg.range);

  // Add to the velocity
  startBg.col += startBg.vcsv;
  startBg.col2 += startBg.vcsv2;
  startBg.col3 += startBg.vcsv3;
  // Add to the time
  startBg.st += 0.1;
  startBg.st2 += 0.001;
  startBg.st3 += 0.01;

  // Draw the middle circle
  push();
  fill(startBg.col, startBg.col2, startBg.col3);
  ellipse(startBg.x, startBg.y, startBg.w, startBg.h);
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
  text(startText, startBg.titleX, startBg.titleY);
  textAlign(LEFT);
  textSize(16);
  let startIns = "INSTRUCTION: \n1. Your score bars color is same as your paddle color.\n" +
      "2. When you win a point, the ball launches toward your\n" + "paddle.\n" +
      "3. The game ends when the sum of scores equals 15.\n" +
      "4. The winner is the one who's won more points."; // \n means "new line"
  text(startIns, startBg.insX, startBg.insY);
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
  if (dist(mouseX, mouseY, startButton.x, startButton.y) < startButton.Size / 2) {
    playing = true;
    startIt = true;
    leftPaddle.Score = 0;
    rightPaddle.Score = 0;
    victoryBall.w = 0;
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
  if (dist(mouseX, mouseY, reset.x, reset.y) < reset.Size / 2) {
    startIt = false;
    victory = false;
    leftPaddle.Score = 0;
    rightPaddle.Score = 0;
    victoryBall.w = 0;
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
