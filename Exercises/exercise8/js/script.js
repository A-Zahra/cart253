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
// All hardcoded numbers will be replaced by variables once the game programming is close to get finished.
let countTargets;
let startBackground;
// Decides when to show start screen, game screen, end screen
let startScreen = true;
let firstStep = false;
let secondStep = false;
let thirdStep = false;
let gameOver = false;
let stepIsOver = false;
let firstWin = false;
let secondWin = false;
let firstFailure = true;
let secondFailure = true;

// Declare paddle object
let paddle;
// Declare ball object
let ball;

// Declare objects and variables related to first step targets
let targets = [];
let maxTarget = 100;
let targetProperties = [];
let numTarget;
let isTrue = [];
let isFalse = [];
// Decides whether to show targets or not.
let showRow = [];
let hideRow = [];
let isOver = [];
let targetSum = [];
let isSumTrue = [];

// Declare barriers arrays and their properties variables
let barriers = [];
let barrierY = [];
let MAX_BARRIERS = 11;
let secondBarriers = [];
let MAX_SECONDBARRIERS = 50;

// Second step target properties declaration
let secondStepTarget = [];
let targetPosition = [];
let score;

let thirdStepTarget = [];
// preload()
//
// Insert all external files
function preload() {
  startBackground = loadImage("assets/images/cityBackground.jpg");
}

// setup()
//
// Sets up all intial values
function setup() {
  createCanvas(windowWidth, windowHeight - 5);
  setUpGame();
}

// setUpGame
//
// Sets up all initial values in an independent function
// so that it can be used in functions like restart function.
function setUpGame() {
  // First step target properties
  countTargets = 0;
  targetSum = [0, 0, 0];
  showRow = [true, false, false];
  hideRow = [false, false, false];
  isTrue = [1, 3, 5];
  isFalse = [2, 4, 6];
  isOver = [4, 3, 2];
  isSumTrue = [3, 2, 1];
  // Second step target properties
  targetPosition = [false, true, false, true, false, true];

  // Makes an object of gameStructure and assign default values to
  gameStructure = new GameStructure(width / 2, height / 2.5, width / 2, height / 2.5);

  // Targets drawing code was borrowed from:
  // <Daniel Shiffman> (<15/March/2016>) <Random Circles with No Overlap> (https://www.youtube.com/watch?v=XATr_jdh-44).
  // However, most parts of it got modified.
  let protection = 0;
  while (targets.length < maxTarget) {
    // Declare and assign targets properties
    let target = [{
      x: random(100, width - 100),
      y: random(370, (height / 2) + 50),
      radius: 25,
      id: 1,
      fillColor: color(74, 136, 47),
      proximity: 1
    }, {
      x: random(100, width - 100),
      y: random(220, (height / 2) - 100),
      radius: 40,
      id: 3,
      fillColor: color(206, 42, 100),
      proximity: 1.5
    }, {
      x: random(150, width - 100),
      y: random(80, (height / 2) - 250),
      radius: 60,
      id: 5,
      fillColor: color(49, 220, 136),
      proximity: 2
    }];

    // To check whether the two circles overlapped.
    let overlapping = false;
    // Check the distance between the new circle and all the old ones. If the distance between
    // the two is less than sum of both radius, don't add the new circle to the array.
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < targetProperties.length; i++) {
        let other = targetProperties[i];
        let d = dist(target[j].x, target[j].y, other.x, other.y);
        if (d < (target[j].radius + other.radius) / target[j].proximity) {
          overlapping = true;
          break;
        }
      }
      // If is not overlapping add to the array
      if (!overlapping) {
        targetProperties.push(target[j]);
      }
    }
    protection++;
    if (protection > 200) {
      break;
    }
  }
  // Makes new target objects and assign target properties to
  for (let i = 0; i < targetProperties.length; i++) {
    targets[i] = new FirstStepTarget(targetProperties[i]);
  }

  // Makes ball object and assign default values to
  ball = new BallStraight(width / 2 + 50, height - 140);
  // Makes paddle object and assign default values to
  paddle = new PaddleStraight(width / 2, height - 120);

  // Makes an array of barrier and target objects and assign x and y values as well as random sizes to objects.
  // Because the number of y positions is less than the number of barriers, an external value should be used.
  // Thus, after every five time of code execution it would be restarted to use the same positions for the next five barriers.
  // Score will keep track of targets score which get accumilated every time the player hits a target.
  score = 0;
  let j = 0;
  for (let i = 0; i < MAX_BARRIERS; i++) {
    // Define barriers y position
    barrierY = [height / 2 - 150, height / 2 - 200, height / 2 - 290, height / 3 - 100, height / 3 + 50, height / 3 + 130];
    // Add barriers to the array
    barriers[i] = new BarrierStraight(i * 150.0, barrierY[j]);
    // Use targetPosition to place targets in random positions.
    if (targetPosition[j] === true) {
      // Generate random sizes for the targets
      let r = random(30, 60);
      // Add targets to the array
      // Targets y positions are in accordance with barriers y positions
      let secondTarget = {
        x: (i * 150.0),
        y: barrierY[j] + 65,
        size: r
      };
      secondStepTarget[i] = new SecondStepTarget(secondTarget);
    } else {
      secondStepTarget[i] = new SecondStepTarget(0, 0, 0);
    }
    j++;
    // Restart to use y position
    if (i === 5 || i === 10) {
      j = 0;
      // Give random y position
      for (let i = 0; i < 6; i++) {
        let r = random(1, 3);
        if (r < 2) {
          targetPosition[i] = true;
        } else if (r > 2) {
          targetPosition[i] = false;
        }
      }
    }
  }

  // Assign third step barriers properties to barriers objects
  let yPosition = 0;
  let otherYPosition;
  let xPosition = 0;
  let otherXPosition;
  let inOneLine = false;
  let size = 40;
  for (let i = 0; i < MAX_SECONDBARRIERS; i++) {
    otherYPosition = yPosition;
    otherXPosition = xPosition;
    yPosition = abs(random(0, (height - 250)));
    xPosition = i * 150.0;
    // Target position and size
    let thirdTarget = {
      x: xPosition,
      y: yPosition + 60,
      size: 50
    };
    // If the next barrier y position is in the same row as the previous barrier upper half is placed
    // set inOneLine to true (That is don't add it to array of barriers objects)
    if (yPosition < otherYPosition && yPosition > otherYPosition - size) {
      inOneLine = true;
    }
    // If the next barrier y position is in the same row as the previous barrier lower half is placed
    // set inOneLine to true (That is don't add it to array of barriers objects)
    else if (yPosition > otherYPosition && yPosition < otherYPosition + size) {
      inOneLine = true;
    }
    // Add the new barrier if is not in the same line as the previous barrier is
    if (!inOneLine) {
      // Add barriers objects to the array + Add targets object to the array
      secondBarriers[i] = new BarrierStraight(xPosition, yPosition);
      thirdStepTarget[i] = new SecondStepTarget(thirdTarget);
    }
  }
}

// draw()
//
// Handles and displays all game elements
function draw() {
  // Start screen
  if (startScreen) {
    background(startBackground);
    gameStructure.startScreenDisplay();
  }
  // Game first step
  else if (firstStep) {
    background(0);
    // Resets paddle position and define play area
    if (mouseY > (height / 2 + 200) && mouseY < (height)) {
      paddle.x = mouseX;
      paddle.y = mouseY;
    }

    // Display targets
    displayTargets();
    // Displays play area
    gameStructure.playArea();

    // Handles ball input
    ball.handleInput(firstStep);
    // Check if ball is jumping
    ball.handleJumping(paddle);
    // Updates ball position based on paddle position
    ball.updatePosition(paddle.x + 50);

    // Checks if ball collided with a target
    // If so hide the target and changes its id number so that it won't be counted again.
    for (let i = 0; i < targets.length; i++) {
      targets[i].goalAchieved(ball);
    }

    // Displays Ball and paddle
    paddle.display();
    ball.display();

    // If ball goes off the bottom of screen or all targets disappeared, game is over.
    if (ball.y > height) {
      firstFailure = false;
      stepIsOver = true;
      firstStep = false;
    }
  }
  // Transition screen
  else if (stepIsOver) {
    background(255);
    if (firstWin) {
      gameStructure.TransitionScreenDisplay("Good job buddy!", firstWin);
    } else if (!firstFailure) {
      gameStructure.TransitionScreenDisplay("Oops you've got too ambitous!", firstFailure);
    } else if (secondWin) {
      gameStructure.TransitionScreenDisplay("Good job buddy, Ready for next step!", secondWin);
    } else if (!secondFailure) {
      gameStructure.TransitionScreenDisplay("Oops, did you misuse your will!", secondFailure);
    }
  }
  // Game second step
  else if (secondStep) {
    background(0);

    // Resets paddle position
    paddle.x = mouseX;
    paddle.y = mouseY;

    // Update barriers position. Make them loop
    for (let i = 0; i < barriers.length; i++) {
      barriers[i].display();
      barriers[i].updatePosition();
    }
    // Check if ball collided barriers.
    // If so, decrease his health by 20%
    for (let i = 0; i < barriers.length; i++) {
      barriers[i].ballBarrierCollision(ball);
    }

    // Draw second step targets
    // Update target x postion if it went off screen
    // Check if ball collided with second step target. If so add to player score
    for (let i = 0; i < secondStepTarget.length; i++) {
      // Check the target point is counted only once
      if (secondStepTarget[i].id === 1) {
        secondStepTarget[i].display();
      }
      secondStepTarget[i].updatePosition();
      ball.targetCollision(secondStepTarget[i]);
    }

    // Handles ball input
    ball.handleInput(!firstStep);
    // Check if ball is jumping
    ball.handleJumping(paddle);
    // Updates ball position based on paddle position
    ball.updatePosition(paddle.x + 50);
    // Display percent of health + Display player score
    ball.displayHealth();
    ball.displayScore();
    // Updates target health. reduces health based on a random speed.
    // I keep this code cause I might use it again
    // for (let i = 0; i < targets.length; i++) {
    //   targets[i].updateHealth();
    // }

    // Displays Ball and paddle
    paddle.display();
    ball.display();

    // If the player score reached to 100, second step ends +
    // show transition screen to go to next step
    if (ball.score > 10) {
      stepIsOver = true;
      secondWin = true;
      secondStep = false;
    }
    // If ball goes off the bottom of screen or player lost his whole life, game is over.
    else if (ball.y > height || ball.opacity <= 0) {
      stepIsOver = true;
      secondFailure = false;
      secondStep = false;
    }
  }
  // Game third step
  else if (thirdStep) {
    background(0);

    // Resets paddle position
    paddle.x = mouseX;
    paddle.y = mouseY;

    // Update barriers position. Display barriers and Make them loop
    // Update targets position. Display targets and Make them loop
    for (let i = 0; i < barriers.length; i++) {
      secondBarriers[i].display();
      secondBarriers[i].updatePosition();
      thirdStepTarget[i].display();
      thirdStepTarget[i].updatePosition();
    }
    // Check if ball collided barriers.
    // If so, decrease his health by 20%
    for (let i = 0; i < barriers.length; i++) {
      secondBarriers[i].ballBarrierCollision(ball);
    }

    // Display percent of health + Display player score
    ball.displayHealth();
    ball.displayScore();
    // Handles ball input
    ball.handleInput(thirdStep);
    // Check if ball is jumping
    ball.handleJumping(paddle);
    // Updates ball position based on paddle position
    ball.updatePosition(paddle.x + 50);

    // Displays Ball and paddle
    paddle.display();
    ball.display();

    if (ball.y > height) {
      gameOver = true;
    }
  }
  // Game over screen
  else if (gameOver) {
    background(0);
    gameStructure.gameOverDisplay();
  }
}

// displayTargets()
//
// Display targets
function displayTargets() {
  for (let i = 0; i < targets.length; i++) {
    // Check if the target belongs to the row currently being displayed
    // and if the number of achieved targets has not reached a certain number
    if (targets[i].targetIdTrue === isTrue[countTargets] && targetSum[countTargets] < isOver[countTargets]) {
      // If so, add one to the number of achieved targets
      if (targetSum[countTargets] < isOver[countTargets]) {
        targetSum[countTargets]++;
      }
      // Change the target id so that it won't be counted again
      targets[i].targetIdTrue = isFalse[countTargets];
      // If the number of targets achieved reached the specified value
      if (targetSum[countTargets] === isSumTrue[countTargets] && hideRow[countTargets] === false) {
        // Hide that row
        showRow[countTargets] = false;
        // In order not to exceed the number of existing rows
        if (!((countTargets + 1) === 3)) {
          // Show next row
          showRow[countTargets + 1] = true;
        }
        // Reset sum of targets
        targetSum[countTargets] = 0;
        // Make this conditional statement totally out of access
        // so that it won't be used in next round.
        hideRow[countTargets] = true;
        // Go to the next row
        countTargets++;
      }
    }
    // Display target
    if (targets[i].targetId === isTrue[countTargets] && showRow[countTargets] === true) {
      targets[i].display();
    }
    // Show the number of targets achieved.
    let numTarget = targetSum[countTargets];
    gameStructure.targetTracker(numTarget);
  }
  // If the player went through all three rows, goes to next step
  if (countTargets === 3) {
    firstStep = false;
    stepIsOver = true;
    firstWin = true;
  }
}

// play()
//
// play the game
// (Borrowed from my second project)
function play() {
  // If the distance between mouse position and
  // the start button is less than the button size reset the following values.
  if (dist(mouseX, mouseY, gameStructure.playButton.x, gameStructure.playButton.y) < gameStructure.playButton.w) {
    firstStep = true;
    startScreen = false;
    setUpGame();
  }
}

// next()
//
// Go to next level
function next() {
  // If the distance between mouse position and
  // the start button is less than the button size reset the following values.
  if (dist(mouseX, mouseY, gameStructure.nextButton.x, gameStructure.nextButton.y) < gameStructure.nextButton.w) {
    // If player won first step, reset the following values
    if (firstWin) {
      firstStep = false;
      stepIsOver = false;
      secondStep = true;
      firstWin = false;
    } // If player won sceond step, reset the following values
    else if (secondWin) {
      secondStep = false;
      stepIsOver = false;
      thirdStep = true;
      secondWin = false;
      console.log("came in");
    }
    setUpGame();
  }
}

// playAgain()
//
// Play this level again
function playAgain() {
  // If the distance between mouse position and
  // the start button is less than the button size reset the following values.
  if (dist(mouseX, mouseY, gameStructure.nextButton.x, gameStructure.nextButton.y) < gameStructure.nextButton.w) {
    // If player lost first layer, reset the following values
    // so that he can play the same step again
    if (!firstFailure) {
      firstStep = true;
      stepIsOver = false;
      firstFailure = true;
    }
    // If player lost second layer, reset the following values
    // so that he can play the same step again
    else if (!secondFailure) {
      secondStep = true;
      stepIsOver = false;
      secondFailure = true;
    }
    setUpGame();
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
    firstStep = false;
    secondStep = false;
    stepIsOver = false;
    firstWin = false;
    firstFailure = true;
    gameOver = false;
    setUpGame();
  }
}

// mousePressed()
//
// If mouse is pressed apply the following code.
function mousePressed() {
  if (startScreen) {
    play();
  } else if (firstStep) {
    ball.isJumping = true;
  } else if (secondStep) {
    ball.isJumping = true;
  } else if (thirdStep) {
    ball.isJumping = true;
  } else if (stepIsOver) {
    if (firstWin) {
      next();
    } else if (!firstFailure) {
      playAgain();
    } else if (secondWin) {
      next();
    } else if (!secondFailure) {
      playAgain();
    }
  } else if (gameOver) {
    restart();
  }
}
