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
let j=0;
let startBackground;
// Decides when to show start screen, game screen, end screen
let startScreen = true;
let firstStep = false;
let secondStep = false;
let gameOver = false;
let stepIsOver = false;
let firstWin = false;
let firstFailure = true;
// Declare paddle object
let paddle;

// Declare ball object
let ball;

// Declare objects and variables related to targets
let targets = [];
let maxTarget = 100;
let targetProperties = [];
let numTarget;
// Decides whether to show targets or not.
let isTrue = [];
let isFalse = [];
let showRow = [];
let hideRow = [];
let isOver = [];
let targetSum = [];
let isSumTrue = [];
// Declare barriers array
let barriers = [];
let barrierY = [];
let MAX_BARRIERS = 15;

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
  targetSum = [0, 0, 0];
  showRow = [true, false, false];
  hideRow = [false, false, false];
  isTrue = [1, 3, 5];
  isFalse = [2, 4, 6];
  isOver = [4, 3, 2];
  isSumTrue = [3, 2, 1];

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
      },
      {
        x: random(100, width - 100),
        y: random(220, (height / 2) - 100),
        radius: 40,
        id: 3,
        fillColor: color(206, 42, 100),
        proximity: 1.5
      },
      {
        x: random(150, width - 100),
        y: random(80, (height / 2) - 250),
        radius: 60,
        id: 5,
        fillColor: color(49, 220, 136),
        proximity: 2
      }
    ];

    // To check whether the two circles overlapped.
    let overlapping = false;
    // Check the distance between the new circle and all the old ones.
    // If the distance between the two is less than sum of both radius,
    // don't add the new circle to the array.
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
    targets[i] = new Target(targetProperties[i]);
  }

  // Makes an array of barrier objects and assign random default values to objects (be used soon)
  for (let i = 0; i < MAX_BARRIERS; i++) {
    barriers[i] = new BarrierStraight(i * 200.0, random(100, height - 100));
  }
  // Makes ball object and assign default values to
  ball = new BallStraight(width / 2 + 50, height - 140);
  // Makes paddle object and assign default values to
  paddle = new PaddleStraight(width / 2, height - 120);
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
    ball.handleInput();
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
    if (firstWin) {
      background(255);
      gameStructure.TransitionScreenDisplay("Good job buddy!", firstWin);
    }
    else if (!firstFailure) {
      background(255);
      gameStructure.TransitionScreenDisplay("Oops you've got too ambitous!", firstFailure);
    }
  }
  // Game second step
  else if (secondStep) {
    background(0);

    // Resets paddle position
    paddle.x = mouseX;
    paddle.y = mouseY;

    // Displays barriers (be used soon)
    for (let i = 0; i < barriers.length; i++) {
      barriers[i].display();
    }

    // Handles ball input
    ball.handleInput();
    // Check if ball is jumping
    ball.handleJumping(paddle);
    // Updates ball position based on paddle position
    ball.updatePosition(paddle.x + 50);
    // Updates target health. reduces health based on a random speed.
    // I keep this code cause I might use it again
    // for (let i = 0; i < targets.length; i++) {
    //   targets[i].updateHealth();
    // }

    // Displays Ball and paddle
    paddle.display();
    ball.display();

    // If ball goes off the bottom of screen or all targets disappeared, game is over.
    if (ball.y > height) {
      gameOver = true;
      firstStep = false;
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
      if (targets[i].targetIdTrue === isTrue[j] && targetSum[j] < isOver[j]) {
        // If so, add one to the number of achieved targets
        if (targetSum[j] < isOver[j]) {
            targetSum[j] ++;
        }
        // Change the target id so that it won't be counted again
        targets[i].targetIdTrue = isFalse[j];
        // If the number of targets achieved reached the specified value
        if (targetSum[j] === isSumTrue[j] && hideRow[j] === false) {
          // Hide that row
          showRow[j] = false;
          // In order not to exceed the number of existing rows
          if (!((j+1) === 3)) {
            // Show next row
              showRow[j+1] = true;
          }
          // Reset sum of targets
          targetSum[j] = 0;
          // Make this conditional statement totally out of access
          // so that it won't be used in next round.
          hideRow[j] = true;
          // Go to the next row
          j++;
        }
      }
      // Display target
      if (targets[i].targetId === isTrue[j] && showRow[j] === true) {
        targets[i].display();
      }
    }
    // If the player went through all three rows, goes to next step
    if (j === 3) {
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
    firstStep = false;
    stepIsOver = false;
    secondStep = true;
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
    firstStep = true;
    stepIsOver = false;
    firstFailure = true;
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
  } else if (firstStep || secondStep) {
    ball.isJumping = true;
  } else if (stepIsOver) {
    if (firstWin) {
        next();
    }
    else if (!firstFailure){
      playAgain();
    }
  } else if (gameOver) {
    restart();
  }
}
