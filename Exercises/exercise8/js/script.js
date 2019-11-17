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
let targetsLost = 0;
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
let MAX_BARRIERS = 5;


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
  isOver = [8, 7, 6];
  isSumTrue = [7, 6, 5];
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
    // If the distance between the two is less than sum of both circles radius,
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
    barriers[i] = new BarrierStraight(i * 75.0, random(height / 2, height - 100));
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
    background(255);
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
    if (ball.isJumping === true) {
      // it is not falling
      ball.isFalling = false;
      // increase the y Speed of ball
      ball.ySpeed += 3;
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
      background(0);
      gameStructure.TransitionScreenDisplay("good job buddy!", firstWin);
    }
    else if (!firstFailure) {
      background(0);
      gameStructure.TransitionScreenDisplay("oops you've got too ambitous!", firstFailure);
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
    if (ball.isJumping === true) {
      // it is not falling
      ball.isFalling = false;
      // increase the y Speed of ball
      ball.ySpeed += 3;
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

// displayTargets
//
// Display targets
function displayTargets() {
  for (let i = 0; i < targets.length; i++) {
    if (targets[i].targetIdTrue === isTrue[0] && targetSum[0] < isOver[0]) {
      if (targetSum[0] < isOver[0]) {
        targetSum[0]++;
      }
      targets[i].targetIdTrue = isFalse[0];
      console.log("target sum 0 " + targetSum[0]);
      //  console.log("small target true"+ targets[i].targetIdTrue);
      if (targetSum[0] === isSumTrue[0] && hideRow[0] === false) {
        showRow[0] = false;
        showRow[1] = true;
        targetSum[0] = 0;
        hideRow[0] = true;
      }
    } else if (targets[i].targetIdTrue2 === isTrue[1] && targetSum[1] < isOver[1]) {
      if (targetSum[1] < isOver[1]) {
        targetSum[1]++;
      }
      //  targetSum[1] ++;
      targets[i].targetIdTrue2 = isFalse[1];
      console.log("target sum 1 " + targetSum[1]);
      if (targetSum[1] === isSumTrue[1] && hideRow[1] === false) {
        showRow[1] = false;
        showRow[2] = true;
        targetSum[1] = 0;
        hideRow[1] = true;
      }
    } else if (targets[i].targetIdTrue3 === isTrue[2] && targetSum[2] < isOver[2]) {
      if (targetSum[2] < isOver[2]) {
        targetSum[2]++;
      }
      //targetSum[2]++;
      targets[i].targetIdTrue3 = isFalse[2];
      console.log("target sum 2 " + targetSum[2]);
      if (targetSum[2] === isSumTrue[2] && hideRow[2] === false) {
        showRow[2] = false;
        hideRow[2] === true;
        targetSum[2] = 0;
        firstStep = false;
        stepIsOver = true;
        firstWin = true;
      }
    }
    if (targets[i].targetId === isTrue[0] && showRow[0] === true) {
      targets[i].display();
    } else if (targets[i].targetId === isTrue[1] && showRow[1] === true) {
      targets[i].display();
    } else if (targets[i].targetId === isTrue[2] && showRow[2] === true) {
      targets[i].display();
    }
  }
  //   for (let i = 0; i < targets.length; i++) {
  //     for(let j = 0; j < 3; j++) {
  //       if (targets[i].targetIdTrue === isTrue[j] && targetSum[j] < isOver[j]) {
  //         if (targetSum[j] < isOver[j]) {
  //             targetSum[j] ++;
  //         }
  //         targets[i].targetIdTrue = isFalse[j];
  //         console.log("target sum 0 "+targetSum[j]);
  //         //  console.log("small target true"+ targets[i].targetIdTrue);
  //         if (targetSum[j] === isSumTrue[j] && hideRow[j] === false) {
  //           showRow[j] = false;
  //           if (!((j+1) === 3)) {
  //               showRow[j+1] = true;
  //           }
  //           targetSum[j] = 0;
  //           hideRow[j] = true;
  //           console.log(targetSum[j] === isSumTrue[j]);
  //         }
  //       }
  //       if (targets[i].targetId === isTrue[j] && showRow[j] === true) {
  //         targets[i].display();
  //       }
  //     }
  //   }
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
  } else if (firstStep) {
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
