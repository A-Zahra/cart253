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
// Decides when to show start screen, game steps screens, transition screens and end screen
let startScreen = true;
let firstStep = false;
let secondStep = false;
let thirdStep = false;
let victoryScreen = false;
let gameOver = false;
let stepIsOver = false;
let firstWin = false;
let secondWin = false;
let warning = false;
let firstFailure = true;
let secondFailure = true;
let thirdFailure = true;
// Variables which decide whether to show rotated or not rotated screen
let rotated;
let notRotated;
let turnTracker;
let ballHeight1;
let ballHeight2;
// Variables which decide where the elements to be positioned after or before rotation
let positionBeforeRotation;
let positionAfterRotation;

// Declare paddle objects
let paddle;
let paddleRotated;
// Declare ball objects
let ball;
let ballRotated;

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
let secBarrierProp = [];
let MAX_SECONDBARRIERS = 10;

// Second step targets array of objects and properties declaration
let secondStepTarget = [];
let targetPosition = [];

// Third step targets array of objects and properties declaration
let thirdStepTarget = [];
let thirdTargetProp = [];

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
  setupPlayer();
  setUpGame();
}

// Sets up all initial values in an independent function
// so that it can be used in functions like restart function.
// setupPlayer()
//
// Sets up paddle and ball initial values
function setupPlayer() {
  // Makes ball object and assign default values to
  ball = new BallStraight(width / 2 + 50, height - 120);
  // Makes paddle object and assign default values to
  paddle = new PaddleStraight(width / 2, height - 100);

  // Makes ball object and assign default values to
  ballRotated = new BallRotated(width / 2 + 50, 150);
  // Makes paddle object and assign default values to
  paddleRotated = new PaddleRotated(width / 2, 130);
}

// setUpGame()
//
// Sets up all initial values other than paddle and ball
function setUpGame() {
  // Ball jump height differs depending on which step is being displayed
  ballHeight1 = 1;
  ballHeight2 = 2;
  // Screen elements positions differs depending on which step is being displayed
  positionBeforeRotation = 1;
  positionAfterRotation = 2;
  // Decides whether rotated or not rotated screen to be shown
  rotated = false;
  notRotated = true;
  // Decides whether it's rotated screen's turn or not-rotated screen's turn to be displayed
  turnTracker = true;

  // First step target properties
  countTargets = 0;
  targetSum = [0, 0, 0];
  showRow = [true, false, false];
  hideRow = [false, false, false];
  isTrue = [1, 3, 5];
  isFalse = [2, 4, 6];
  isOver = [4, 3, 2];
  isSumTrue = [3, 2, 1];
  // Second step target property
  // Using this array, everytime targets are placed under a random number of barriers
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

  // Makes an array of barriers and targets objects and assign position, behaviour id, color and random sizes to objects.
  // Because the number of y positions is less than the number of barriers, an external value should be used.
  // Thus, after every five time of code execution, it would reuse the same positions for the next five barriers.
  let numBarriers = 0;
  // If 4 out of 10 targets got hidden, show the rest
  let numHiddenTargets = 0;

  // Puts targets under random barriers
  // Number of targets should be less than 10
  // Choose randomly which targets to be shown(thus, most likely, by everytime code execution, they are placed under a new barrier)
  for (let k = 0; k < 10; k++) {
    // Set targetPosition randomly to false and true values
    let r = floor(random(1, 3));
    if (r > 2 && numHiddenTargets < 4) {
      numHiddenTargets++;
      targetPosition[k] = false;
    } else if (r < 2) {
      targetPosition[k] = true;
    }
  }
  // Assign values to the variables, objects and arrays of second step elements
  for (let i = 0; i < MAX_BARRIERS; i++) {
    // Define barriers y position
    barrierY = [height / 2 - 150, height / 2 - 200, height / 2 - 290, height / 3 - 100, height / 3 + 50, height / 3 + 130];
    // Assign barriers properties to the relevent object
    // Behaviour is used to make decision for the third step elements
    // (How elements behave before and after rotation)
    barrierProperties = {
      y: barrierY[numBarriers],
      x: i * 150,
      behaviour: 1
    };

    // Add barriers to the array
    barriers[i] = new BarrierStraight(barrierProperties);

    // Use targetPosition to place targets in random positions.
    // If target position was false, do not assign it to the array
    if (targetPosition[numBarriers] === true) {
      // Generate random sizes for the targets
      let r = random(30, 60);
      // Assign targets properties to the relevent object
      // Targets x and y positions are in accordance with barriers y positions
      let secondTarget = {
        x: (i * 150.0),
        y: barrierY[numBarriers] + 65,
        fillColor: color(212, 30, 157),
        radius: r
      };
      // Add new target to the array
      secondStepTarget[i] = new SecondStepTarget(secondTarget);
    }
    // If targetPosition is false assign zero to the array index
    else {
      secondStepTarget[i] = 0;
    }
    numBarriers++;
    // Restart to use same y positions
    if (i === 5 || i === 10) {
      numBarriers = 0;
    }
  }

  // Assign third step barriers properties to barriers objects and the objects to the declared array
  // Assign third step targets properties to targets objects and the objects to the declared array
  // Specify limit of targets and barriers that should be generated
  let limit = 0;
  // The variable that is multiplied with a certain amount to specify the distance between objects
  let t = 0;
  // Y position
  let y;
  while (secondBarriers.length < MAX_SECONDBARRIERS) {
    y = floor(random(30, (height - 150)));
    // Declare and assign barriers properties
    let secBar = {
      x: t * 145,
      y: y,
      radius: 40,
      proximity: 1.2,
      behaviour: floor(random(1, 3))
    };
    // Declare and assign targets properties
    let thirdTarget = {
      x: t * 145,
      y: y + 60,
      radius: random(40, 80),
      proximity: 1.2,
      fillColor: color(29, 227, 252)
    }
    // To check whether the two objects overlapped.
    let inOneLine = false;
    // Check the distance between the new barrier and all the old ones. If the distance between
    // the two is less than sum of both radius, don't add the new one to the array.
    // If the new barrier y position was in the upper half of the previous barrier or
    // if it was in the lower half of the previous one, don't add it to the array and break
    for (let i = 0; i < secBarrierProp.length; i++) {
      let otherBarrier = secBarrierProp[i];
      let d = dist(secBar.x, secBar.y, otherBarrier.x, otherBarrier.y);
      if (d < (secBar.radius + otherBarrier.radius) / secBar.proximity) {
        inOneLine = true;
        break;
      } else if (secBar.y < otherBarrier.y && secBar.y > otherBarrier.y - otherBarrier.radius) {
        inOneLine = true;
        break;
      } else if (secBar.y > otherBarrier.y && secBar.y < otherBarrier.y + otherBarrier.radius) {
        inOneLine = true;
        break;
      }
    }
    // If is not overlapping add to the array of properties
    if (!inOneLine) {
      secBarrierProp.push(secBar);
      thirdTargetProp.push(thirdTarget);
      t++;
      limit++;
    }
    // If the number of barriers reached to 10 stop the process of new objects assignment to the arrays
    if (limit > 10) {
      break;
    }
  }
  // Makes new target and barrier objects and assign their properties to
  for (let i = 0; i < secBarrierProp.length; i++) {
    secondBarriers[i] = new BarrierStraight(secBarrierProp[i]);
    thirdStepTarget[i] = new SecondStepTarget(thirdTargetProp[i]);
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
    ball.handleInput(firstStep, ballHeight1);
    // Check if ball is jumping
    ball.handleJumping(paddle, ballHeight1);
    // Updates ball position based on paddle position
    ball.updatePosition(paddle.x + 50);

    // Checks if ball collided with a target
    // If so hide the target and changes its id number so that it won't be counted again.
    for (let i = 0; i < targets.length; i++) {
      targets[i].goalAchieved(ball);
    }

    // Displays Ball and paddle
    paddle.display();
    ball.display(gameStructure);

    // If ball goes off the bottom of screen, Show replay screen.
    if (ball.y > height) {
      firstFailure = false;
      stepIsOver = true;
      firstStep = false;
    }
  }
  // Transition screen
  else if (stepIsOver) {
    background(255);
    // Screens which are shown, when the player wins a step or loses.
    if (firstWin) {
      gameStructure.TransitionScreenDisplay("Good job buddy!", firstWin);
    } else if (!firstFailure) {
      gameStructure.TransitionScreenDisplay("Oops you've got too ambitous!", firstFailure);
    } else if (secondWin) {
      gameStructure.TransitionScreenDisplay("Good job buddy, Ready for next step!", secondWin);
    } else if (!secondFailure) {
      gameStructure.TransitionScreenDisplay("Oops, did you misuse your will!", secondFailure);
    } else if (!thirdFailure) {
      gameStructure.TransitionScreenDisplay("Oops, So close, you just need a little bit of more effort!", thirdFailure);
    }
  }
  // Game second step
  else if (secondStep) {
    background(0);
    // Resets paddle position once ball jumping is true
    if (ball.isJumping) {
      paddle.x = mouseX;
      paddle.y = mouseY;
    }

    // Display barriers
    // Update barriers position. Make them loop
    // Check if ball collided barriers.
    // If so, decrease his health by 20%
    for (let i = 0; i < barriers.length; i++) {
      barriers[i].display(positionBeforeRotation);
      barriers[i].updatePosition();
      barriers[i].ballBarrierCollision(ball, positionBeforeRotation, gameStructure);
    }

    // Draw second step targets
    // Update target x postion if it went off screen
    // Check if ball collided with second step target. If so add to player score
    for (let i = 0; i < secondStepTarget.length; i++) {
      // Check the target point is counted only once
      if (secondStepTarget[i] !== 0) {
        if (secondStepTarget[i].id === 1) {
          secondStepTarget[i].display(positionBeforeRotation);
        }
        secondStepTarget[i].updatePosition();
        ball.targetCollision(secondStepTarget[i], gameStructure);

      }
    }

    // Handles ball input
    ball.handleInput(!firstStep, ballHeight1);
    // Check if ball is jumping
    ball.handleJumping(paddle, ballHeight1);
    // Updates ball position based on paddle position
    ball.updatePosition(paddle.x + 50);
    // Display percent of health + Display player score
    ball.displayHealth(gameStructure);
    ball.displayScore(gameStructure);
    // Updates target health. reduces health based on a random speed.
    // I keep this code cause I might use it again
    // for (let i = 0; i < targets.length; i++) {
    //   targets[i].updateHealth();
    // }

    // Displays Ball and paddle
    paddle.display();
    ball.display(gameStructure);

    // If the player score reached to 100, second step ends +
    // show transition screen to go to next step
    if (gameStructure.score > 10) {
      stepIsOver = true;
      secondWin = true;
      secondStep = false;
    }
    // If ball goes off the bottom of screen or player lost his whole life, game is over.
    else if (ball.y > height || gameStructure.ballOpacity <= 0) {
      stepIsOver = true;
      secondFailure = false;
      secondStep = false;
    }
  }
  // Game third step
  else if (thirdStep) {
    // for (let i = 0; i < thirdStepTarget.length; i++) {
    console.log("player score" + gameStructure.score);
    // }
    if (notRotated) {
      background(0);

      // Resets paddle position
      if (ball.isJumping) {
        paddle.x = mouseX;
        paddle.y = mouseY;
      }

      // Update barriers position. Display barriers and Make them loop
      // Update targets position. Display targets and Make them loop
      for (let i = 0; i < secondBarriers.length; i++) {
        secondBarriers[i].display(positionBeforeRotation);
        secondBarriers[i].updatePosition();
        secondBarriers[i].ballBarrierCollision(ball, positionBeforeRotation, gameStructure);
        if (secondBarriers[i].warning(ball, positionBeforeRotation)) {
          notRotated = false;
          ball.isJumping = false;
          warning = true;
          turnTracker = true;
        }
      }
      for (let i = 0; i < thirdStepTarget.length; i++) {
        if (thirdStepTarget[i].id === 1) {
          thirdStepTarget[i].display(positionBeforeRotation);
        }
        thirdStepTarget[i].updatePosition();
        ball.targetCollision(thirdStepTarget[i], gameStructure);
      }

      // Display percent of health + Display player score
      ball.displayHealth(gameStructure);
      ball.displayScore(gameStructure);
      // Handles ball input
      ball.handleInput(thirdStep, ballHeight2);
      // Check if ball is jumping
      ball.handleJumping(paddle, ballHeight2);
      // Updates ball position based on paddle position
      ball.updatePosition(paddle.x + 50);

      // Displays Ball and paddle
      paddle.display();
      ball.display(gameStructure);

      if (gameStructure.score > 20) {
        thirdStep = false;
        victoryScreen = true;
      }
      if (ball.y > height) {
        thirdStep = false;
        stepIsOver = true;
        thirdFailure = false;
      } else if (gameStructure.ballOpacity <= 0) {
        thirdStep = false;
        stepIsOver = true;
        thirdFailure = false;
      }
    } else if (warning) {
      gameStructure.displayWarningScreen();
      if (dist(gameStructure.timeCubeX, gameStructure.timeCubeY, gameStructure.timeLimitX, gameStructure.timeLimitY) < 50) {
        gameStructure.timeCubeX = (width / 2) - 300;
        gameStructure.timeCubeY = (height / 2) + 100;
        gameStructure.timeLimitX = width / 2 + 300;
        gameStructure.timeLimitY = (height / 2) + 100;
        warning = false;
        setupPlayer();
        if (!notRotated && turnTracker) {
          rotated = true;
        } else if (!rotated && !turnTracker) {
          notRotated = true;
        }
        //  ball.isJumping = false;
      }
    } else if (rotated) {
      background(0);

      if (ballRotated.isJumping) {
        // Resets paddle position and define play area
        paddleRotated.x = mouseX;
        paddleRotated.y = mouseY;
      }


      // Update barriers position. Display barriers and Make them loop
      // Update targets position. Display targets and Make them loop
      for (let i = 0; i < secondBarriers.length; i++) {
        secondBarriers[i].display(positionAfterRotation);
        secondBarriers[i].updatePosition();
        secondBarriers[i].ballBarrierCollision(ballRotated, positionAfterRotation, gameStructure);
        // if (secondBarriers[i].warning(ballRotated, positionAfterRotation)) {
        //   rotated = false;
        //   ballRotated.isJumping = false;
        //   warning = true;
        //   turnTracker = false;
        //
        // }
      }
      for (let i = 0; i < thirdStepTarget.length; i++) {
        if (thirdStepTarget[i].id === 1) {
          thirdStepTarget[i].display(positionAfterRotation);
        }
        thirdStepTarget[i].updatePosition();
        ballRotated.targetCollision(thirdStepTarget[i], gameStructure);
      }
      //  console.log("player score" + playerScore);
      // Display percent of health + Display player score
      ballRotated.displayHealth(gameStructure);
      ballRotated.displayScore(gameStructure);
      // Handles ball input
      ballRotated.handleInput(thirdStep, ballHeight2);
      // Check if ball is jumping
      ballRotated.handleJumping(paddleRotated);
      // Updates ball position based on paddle position
      ballRotated.updatePosition(paddleRotated.x + 50);

      paddleRotated.display();
      ballRotated.display(gameStructure);
      if (gameStructure.score > 20) {
        rotated = false;
        thirdStep = false;
        victoryScreen = true;
      }
      if (ballRotated.y < 0) {
        thirdStep = false;
        stepIsOver = true;
        thirdFailure = false;
      } else if (gameStructure.ballOpacity <= 0) {
        thirdStep = false;
        stepIsOver = true;
        thirdFailure = false;
      }
    }
  } else if (victoryScreen) {
    background(0);
    gameStructure.victoryDisplay();
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
    setupPlayer();
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
    }
    setupPlayer();
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
    else if (!thirdFailure) {
      thirdStep = true;
      stepIsOver = false;
      thirdFailure = true;
    }
    setupPlayer();
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
    victoryScreen = false;
    setupPlayer();
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
    if (notRotated) {
      ball.isJumping = true;
    } else if (rotated) {
      ballRotated.isJumping = true;
    }
  } else if (stepIsOver) {
    if (firstWin) {
      next();
    } else if (!firstFailure) {
      playAgain();
    } else if (secondWin) {
      next();
    } else if (!secondFailure) {
      playAgain();
    } else if (!thirdFailure) {
      playAgain();
    }
  } else if (victoryScreen) {
    restart();
  } else if (gameOver) {
    restart();
  }
}
