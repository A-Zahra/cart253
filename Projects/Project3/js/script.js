// Pong Simulation
// by Zahra Ahmadi

/****************************************************************************/
// This game is a simulation of Pong game. It has three steps and the steps are complementary.
// That is, the player should use the skills he gains in each step in the next ones.
// At the beginning of the game there is an instruction screen which tells the player how to play
// and what is expecting him.
// At the beginning of the game there is an instruction screen which tells the player
// how to play, and what is expecting him.
// In victory screen of each step, a bit of the game story is narrated as well. There are also replay
// screens which let the player to play again to finally move on to the next step.
// There is also one victory screen at the end which is displayed, only once the player wins the last step.
//
/****************************************************************************/
// Reference
//
// --** Images **--
// City background:
// https://www.vectorstock.com/royalty-free-vector/city-game-background-2d-application-vector-10371679
// Background 1:
// https://www.everypixel.com/image-8345968771576165834
// Background 2:
// https://www.vectorstock.com/royalty-free-vector/cartoon-student-dormitory-room-interior-vector-20398761
// Background 3:
// http://desk.njfoa-raritan.org/flat-design-desk-8026

// Slingshot:
// https://www.vectorstock.com/royalty-free-vector/simple-slingshot-vector-8615170
// Barriers:
// https://opengameart.org/content/2d-platform-ground-stone-tiles
// Work:
// https://www.123rf.com/photo_47522656_stock-vector-modern-flat-icons-elements-business-office-equipment-office-work-marketing-colored-vector-illustrati.html
// Bicycle:
// https://www.freepik.com/free-vector/collection-colorful-bikes-flat-design_1270178.htm
// Career advancement:
// https://www.popicon.com/products/career-advancement-icon
// Tourism, Camera:
// https://www.vectorstock.com/royalty-free-vector/travel-icon-flat-vector-4305514
// Family, Baby, Marriage, Pet:
// https://icon-library.net/icon/families-icon-21.html
// Home:
// https://www.vectorstock.com/royalty-free-vector/home-icon-placed-in-blue-circle-vector-23387008
// Keyboard keys:
// https://www.freepik.com/premium-vector/main-keyboard-keys-vector_3790038.htm
// Mouse:
// https://www.svgrepo.com/svg/211759/technological-computer-mouse
// Plug and outlet:
// Not found
// Graduation, sport, geography:
// https://www.freepik.com/free-vector/collection-irregular-drawn-school-icons_725976.htm
// Art, Computation, time-Management, experiment:
// https://www.freepik.es/vector-gratis/coleccion-iconos-colegio_1024819.htm
// friendShip:
// https://www.freepik.com/free-vector/friendship-icons_771096.htm
// Mathematics, MapReading, Calculation, Chemistry, Science, Achievement:
// https://dribbble.com/shots/6354172-School-Vector-Freebie-Icon-Set
// Car:
// https://www.123rf.com/photo_59285177_stock-vector-car-icon-with-long-shadow.html
// ContinueEducation:
// https://www.123rf.com/photo_31479984_stock-vector-abstract-vector-collection-of-colorful-flat-education-and-knowledge-icons-design-elements-for-mobile.html

// --** Audios **--
// Backgounds:
// https://www.melodyloops.com/tracks/happiness-and-victory/
// Victories:
// https://freesound.org/people/xtrgamr/sounds/277441/
// http://www.orangefreesounds.com/game-show-winning/
// Barriers and targets:
// https://www.noiseforfun.com/
/****************************************************************************/

let countTargets; // The variable that decides which row turn is to be displayed in first step
// All three steps background images + mouse, ctrl and space key images
let startBackground;
let firstStepBackground;
let secondStepBackground;
let mouse;
let controlKey;
let spaceKey;
// Variables which decide when to show:
let startScreen = true;
let instructionScreen = false;
let storyScreen = false;
let firstStep = false;
let secondStep = false;
let thirdStep = false;
let victoryScreen = false;
let bubbles = []; // Victory screen circles array
let gameOver = false;
let stepIsOver = false; // Screen which connects steps
// screen which will be shown, if player wins the step
let firstWin = false;
let secondWin = false;
// screen which will be shown, if player loses the step
let firstFailure = true;
let secondFailure = true;
let thirdFailure = true;
// The screen that will be shown, every time a screen rotation happens
let warning = false;
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
// Decides whether to show row of targets or not.
let showRow = [];
let hideRow = [];
let isOver = []; // Check if the number of achieved targets reached to the number of requested ones
let targetSum = []; // A variable which keeps track of achieved targets
let isSumTrue = []; // Check if the number of achieved targets reached to the number of requested ones (is used for inner if statement)
let numRows;
// Declare barriers arrays and their properties variables
let barriers = [];
let barrierY = [];
let MAX_BARRIERS = 11; // Maximum number of barriers
let secondBarriers = [];
let secBarrierProp = [];
let MAX_SECONDBARRIERS = 10; // Maximum number of barriers

// Second step targets array of objects and properties declaration
let secondStepTarget = [];
let secondStepScoreLimit = 50;
// An array that is assigned random false and true values to position targets under random barriers
let targetPosition = [];

// Third step targets array of objects and properties declaration
let thirdStepTarget = [];
let thirdTargetProp = [];
let thirdStepScoreLimit = 60;

let numBubbles = 500;
let connectingScreenFillColor = "#FAF29E";
let timeOver = 50;

// Balls and paddles images
let slingShot;
let slingShotRotated;
let stone;
let stoneRotated;

// Barriers images
let barrier1;
let barrier2;
let barrierTouched;

// First step targets images
let firstStepImagesRow1 = [];
let firstStepImagesRow2 = [];
let firstStepImagesRow3 = [];
let achievement;
let art;
let calculation;
let chemistry;
let computation;
let education;
let experiments;
let geography;
let graduation;
let mapReading;
let mathemathics;
let science;
let sport;
let timeManagement;

// Second step targets images
let continueEducation;
let friendship;
let camera;
let bicycle;
let work;

// Third step target images
let baby;
let car;
let careerAdvancement;
let home;
let pet;
let marriage;
let tourism;
let family;

// The images used to show time in connecting screen between rotated and not-rotated screen
let plug;
let outlet;

// Sounds
let backgroundSound;
let backgroundSound2;
let backgroundSound3;
let victorySound;
let stepsVictory;
let targetSound;
let barrierSound;

// preload()
//
// Insert all external files
function preload() {
  // Images
  startBackground = loadImage("assets/images/cityBackground.jpg");
  firstStepBackground = loadImage("assets/images/classroom.jpg");
  secondStepBackground = loadImage("assets/images/secondStepBackground2.png");
  thirdStepBackground = loadImage("assets/images/office.jpg");
  thirdStepBackgroundRotated = loadImage("assets/images/officeRotated.jpg");
  mouse = loadImage("assets/images/mouse.png");
  controlKey = loadImage("assets/images/ctrlKey.png");
  spaceKey = loadImage("assets/images/spaceKey.png");
  // Balls and paddles
  slingShot = loadImage("assets/images/slingShot.png");
  slingShotRotated = loadImage("assets/images/slingShotRotated.png");
  stone = loadImage("assets/images/stone.png");
  stoneRotated = loadImage("assets/images/stoneRotated.png");
  // Barriers
  barrier1 = loadImage("assets/images/Barrier1.png");
  barrier2 = loadImage("assets/images/Barrier2.png");
  barrierTouched = loadImage("assets/images/barrierTouched.png");
  // Step 1 targets
  achievement = loadImage("assets/images/achievement.png");
  art = loadImage("assets/images/art.png");
  calculation = loadImage("assets/images/calculation.png");
  chemistry = loadImage("assets/images/chemistry.png");
  computation = loadImage("assets/images/computation.png");
  education = loadImage("assets/images/education.png");
  experiments = loadImage("assets/images/experiments.png");
  geography = loadImage("assets/images/geography.png");
  graduation = loadImage("assets/images/graduation.png");
  mapReading = loadImage("assets/images/mapReading.png");
  mathemathics = loadImage("assets/images/mathematics.png");
  science = loadImage("assets/images/science.png");
  sport = loadImage("assets/images/sport.png");
  timeManagement = loadImage("assets/images/timeManagement.png");
  // Step 2 targets
  continueEducation = loadImage("assets/images/ContinueEducation.png");
  friendship = loadImage("assets/images/friendship.png");
  camera = loadImage("assets/images/camera.png");
  bicycle = loadImage("assets/images/bicycle.png");
  work = loadImage("assets/images/work.png");
  // Step 3 targets
  baby = loadImage("assets/images/baby.png");
  family = loadImage("assets/images/family.png");
  car = loadImage("assets/images/car.png");
  careerAdvancement = loadImage("assets/images/careerAdvancement.png");
  home = loadImage("assets/images/home.png");
  marriage = loadImage("assets/images/marriage.png");
  pet = loadImage("assets/images/pet.png");
  tourism = loadImage("assets/images/tourism.png");
  // Time
  plug = loadImage("assets/images/plug.png");
  outlet = loadImage("assets/images/outlet.png");
  // Sounds
  soundFormats('mp3', 'ogg');
  backgroundSound = loadSound('assets/sounds/backgroundSound.mp3');
  backgroundSound2 = loadSound('assets/sounds/backgroundSound2.mp3');
  backgroundSound3 = loadSound('assets/sounds/backgroundSound3.mp3');
  victorySound = loadSound('assets/sounds/victorySound.mp3');
  stepsVictory = loadSound('assets/sounds/Victory.wav');
  targetSound = loadSound('assets/sounds/hitTarget.wav');
  barrierSound = loadSound('assets/sounds/hitBarrier.wav');
}

// setup()
//
// Sets up all intial values
function setup() {
  createCanvas(windowWidth, windowHeight - 5);
  setupPlayer();
  setUpGame();
  setUpVictory();
}

// Sets up all initial values in independent functions
// so that it can be used in functions like restart function.

// setupPlayer()
//
// Sets up paddle and ball initial values
function setupPlayer() {
  // Makes ball object and assign default values to
  ball = new BallStraight(width / 2, height - 100, stone);
  // Makes paddle object and assign default values to
  paddle = new PaddleStraight(width / 2, height - 100, slingShot);

  // Makes ball object and assign default values to
  ballRotated = new BallRotated(width / 2, 150, stoneRotated);
  // Makes paddle object and assign default values to
  paddleRotated = new PaddleRotated(width / 2, 130, slingShotRotated);
}

// setUpVictory
//
// Set up victory screen visual elements
function setUpVictory() {
  for (let s = 0; s < numBubbles; s++) {
    let bubbleProperties = {
      y: random(10, height - 10),
      x: random(10, width - 10),
      radius: 8,
      proximity: 2
    }
    bubbles.push(bubbleProperties);
  }
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

  // First step targets images arrays
  firstStepImagesRow1 = [geography, sport, timeManagement, education, mathemathics, calculation];
  firstStepImagesRow2 = [mapReading, art, chemistry, computation, experiments];
  firstStepImagesRow3 = [achievement, graduation, science, ];
  // Second step targets images arrays
  let secondStepLessValuabeTargetImg = [camera, bicycle];
  let secondStepMoreValuabeTargetImg = [work, continueEducation, friendship];
  let secondStepImgTurn = [1, 2]; // To show randomly less or more valuable targets
  // Third step targets images arrays
  let thirdStepLessValuableTargetImg = [home, car, tourism, pet];
  let thirdStepMoreValuableTargetImg = [marriage, baby, careerAdvancement];

  // Makes an object of gameStructure which includes all screens other than the three main steps of the game
  // and assign default values to
  gameStructure = new GameStructure(width / 2, height / 2.5, width / 2, height / 2, slingShot, stone, barrier1, barrierTouched, barrier2, mouse, spaceKey, controlKey, plug, outlet);

  // Set up initial values of first step
  //
  // First step target properties
  countTargets = 0;
  targetSum = [0, 0, 0];
  showRow = [true, false, false];
  hideRow = [false, false, false];
  isTrue = [1, 3, 5];
  isFalse = [2, 4, 6];
  isOver = [8, 7, 6];
  isSumTrue = [7, 6, 5];
  numRows = 3;
  // Targets drawing code was borrowed from:
  // <Daniel Shiffman> (<15/March/2016>) <Random Circles with No Overlap> (https://www.youtube.com/watch?v=XATr_jdh-44).
  // However, most parts of it got modified.

  // A variable that checks whether the number of generated targets reached to a certain number.
  // If so, it breaks the loop
  let protection = 0;
  while (targets.length < maxTarget) {
    // Use the available images of targets randomly
    let randomImages1 = floor(random(0, 6));
    let randomImages2 = floor(random(0, 5));
    let randomImages3 = floor(random(0, 3));
    // Declare and assign targets properties of each row
    let target = [{
      x: random(100, width - 100),
      y: random(370, (height / 2) + 50),
      radius: 65,
      id: 1,
      fillColor: color(74, 136, 47),
      proximity: 1.8,
      image: firstStepImagesRow1[randomImages1],
      sound: targetSound
    }, {
      x: random(100, width - 100),
      y: random(220, (height / 2) - 100),
      radius: 65,
      id: 3,
      fillColor: color(206, 42, 100),
      proximity: 2,
      image: firstStepImagesRow2[randomImages2],
      sound: targetSound
    }, {
      x: random(100, width - 100),
      y: random(80, (height / 2) - 250),
      radius: 67,
      id: 5,
      fillColor: color(49, 220, 136),
      proximity: 2.5,
      image: firstStepImagesRow3[randomImages3],
      sound: targetSound
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
    if (protection > maxTarget) {
      break;
    }
  }
  // Makes new target objects and assign target properties to
  for (let i = 0; i < targetProperties.length; i++) {
    targets[i] = new FirstStepTarget(targetProperties[i]);
  }

  // Set up second step initial values
  //
  // Makes an array of barriers and targets objects and assign position, behaviour id, color and random sizes to objects.
  // Because the number of y positions is less than the number of barriers, an external value should be used.
  // Thus, after every five time of code execution, it would reuse the same positions for the next five barriers.
  let numBarriers = 0;
  // If 4 out of 10 targets got hidden, show the rest
  let numHiddenTargets = 0;

  // Puts targets under random barriers
  // Number of targets should be less than 10
  // Choose randomly which targets to be shown(thus, most likely, by everytime code execution, they are placed under a new barrier)
  let u = 0;
  while (u < MAX_BARRIERS - 1) {
    // Set targetPosition randomly to false and true values
    let r = random(1, 3);
    if (r < 2 && numHiddenTargets < 4) {

      targetPosition.push(false);
      u++;
    } else if (r >= 2 || numHiddenTargets > 4 && numHiddenTargets <= 10) {
      targetPosition.push(true);
      u++;
    }
    numHiddenTargets++;
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
      behaviour: 1,
      image: barrier1,
      image2: barrierTouched,
      sound: barrierSound
    };

    // Add barriers to the array
    barriers[i] = new Barrier(barrierProperties);

    // Use targetPosition to place targets in random positions.
    // If target position was false, do not assign it to the array
    if (targetPosition[numBarriers] === true) {
      // Assign numbers randomly in order to have random images
      let r = floor(random(0, 2));
      let randomImg1 = floor(random(0, 2));
      let randomImg2 = floor(random(0, 3));
      // Assign targets properties to the object
      // Targets x and y positions are in accordance with barriers y positions
      let secondTarget = {
        x: (i * 150.0),
        y: barrierY[numBarriers] + 55,
        fillColor: color(212, 30, 157),
        radius: 70,
        imageId: secondStepImgTurn[r],
        image1: secondStepLessValuabeTargetImg[randomImg1],
        image2: secondStepMoreValuabeTargetImg[randomImg2],
        sound: targetSound
      };
      // Add new target to the array
      secondStepTarget[i] = new SecondStepTarget(secondTarget);
    }
    // If targetPosition is false assign zero to the array index
    else {
      secondStepTarget[i] = 0;
    }
    // add one to the number of barriers that were assigned to the array
    numBarriers++;
    // Restart to use same y positions
    if (i === 5 || i === 10) {
      numBarriers = 0;
    }
  }

  // Set up third step initial values
  //
  // Assign third step barriers properties to barriers objects and the objects to the declared array
  // Assign third step targets properties to targets objects and the objects to the declared array
  // Specify limit of targets and barriers that should be generated
  let limit = 0;
  // The variable that is multiplied with a certain amount to specify the distance between objects (That is used for x position)
  let t = 0;
  while (secondBarriers.length < MAX_SECONDBARRIERS) {
    let y = floor(random(10, (height - 150)));
    // Declare and assign barriers properties
    let secBar = {
      x: t * 145,
      y: y,
      proximity: 1.2,
      behaviour: floor(random(1, 3)),
      image: barrier1,
      image2: barrierTouched,
      secondBarrier: barrier2,
      sound: barrierSound
    };
    // Choose random images of the available images to represent the third step targets
    let thirdStepImgTurn = [1, 2, 3, 1, 2, 3, 1, 2, 2, 1];
    let randomImgSelection1 = floor(random(0, 4));
    let randomImgSelection2 = floor(random(0, 3));
    // Declare and assign targets properties
    let thirdTarget = {
      x: t * 145,
      y: y + 57,
      radius: 75,
      proximity: 1.2,
      fillColor: color(29, 227, 252),
      imageId: thirdStepImgTurn[t],
      image1: thirdStepLessValuableTargetImg[randomImgSelection1],
      image2: thirdStepMoreValuableTargetImg[randomImgSelection2],
      support: family,
      sound: targetSound
    }

    // To check whether the two objects overlapped.
    let inOneLine = false;
    // Check the distance between the new barrier and all the old ones. If the distance between
    // the two is less than sum of both radius, don't add the new one to the array.
    // If the new barrier y position was in the upper half of the previous barrier or
    // If it was in the lower half of the previous one, don't add it to the array and break
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
    if (limit > MAX_SECONDBARRIERS) {
      break;
    }
  }
  // Makes new target and barrier objects and assign their properties to
  for (let i = 0; i < secBarrierProp.length; i++) {
    secondBarriers[i] = new Barrier(secBarrierProp[i]);
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
  } else if (instructionScreen) {
    background(250, 242, 158);
    gameStructure.displayInstruction();
  } else if (storyScreen) {
    background(250, 242, 158);
    gameStructure.displayStory();
  }
  // Game first step
  else if (firstStep) {
    background(firstStepBackground);
    // Resets paddle position if isJumping is true and the paddle is inside the play area
    if (mouseY > (height / 2 + 200) && mouseY < (height) && ball.isJumping) {
      paddle.x = mouseX;
      paddle.y = mouseY;
    }
    // Displays play area
    gameStructure.playArea();

    // Display targets
    displayTargets();

    // Handles ball input
    ball.handleInput(firstStep, ballHeight1);
    // Check if ball is jumping
    ball.handleJumping(paddle, ballHeight1);
    // Updates ball position based on paddle position
    ball.updatePosition(paddle.x + 60);

    // Checks if ball collided with a target
    // If so hide the target and changes its id number so that it won't be counted again.
    for (let i = 0; i < targets.length; i++) {
      targets[i].goalAchieved(ball);
    }

    // Displays Ball and paddle
    paddle.display();
    ball.display(positionBeforeRotation);

    // If ball goes off the bottom of screen, Show replay screen.
    if (ball.y > height) {
      firstFailure = false;
      stepIsOver = true;
      firstStep = false;
      backgroundSound.pause();
    }
  }
  // Transition screen
  else if (stepIsOver) {
    background(connectingScreenFillColor);
    // Screens which are shown when the player wins a step or loses.
    if (firstWin) {
      gameStructure.TransitionScreenDisplay("Good job buddy!", firstWin, 1);
    } else if (!firstFailure) {
      gameStructure.TransitionScreenDisplay("Oh, don't hurry! You need more patience to achieve some goals!", firstFailure, 1);
    } else if (secondWin) {
      gameStructure.TransitionScreenDisplay("Good job buddy, Ready for next step!", secondWin, 2);
    } else if (!secondFailure) {
      gameStructure.TransitionScreenDisplay("Oh, don't hurry! You need more patience to achieve some goals!", secondFailure, 1);
    } else if (!thirdFailure) {
      gameStructure.TransitionScreenDisplay("Oh, don't hurry! You need more patience to achieve some goals!", thirdFailure, 1);
    }
  }
  // Game second step
  else if (secondStep) {
    background(secondStepBackground);
    // Resets paddle position if isJumping is true and the paddle is inside the play area
    if (mouseY > (height / 2 + 200) && mouseY < (height) && ball.isJumping) {
      paddle.x = mouseX;
      paddle.y = mouseY;
    }

    // Displays play area
    gameStructure.playArea();

    // Display barriers
    // Update barriers position. Make them loop
    // Check if ball collided barriers.
    // If so, decrease his health by 20%
    for (let i = 0; i < barriers.length; i++) {
      barriers[i].displaySecond();
      barriers[i].ballFirstBarrierCollision(ball, gameStructure);
      barriers[i].updatePosition();
    }

    // Draw second step targets
    // Update target x postion if it went off screen
    // Check if ball collided with second step target. If so add to player score
    for (let i = 0; i < secondStepTarget.length; i++) {
      // Insure if the target exists
      // Insure the target point is counted only once
      if (secondStepTarget[i] !== 0) {
        if (secondStepTarget[i].id === 1) {
          secondStepTarget[i].display();
        }
        ball.targetCollision(secondStepTarget[i], gameStructure);
        secondStepTarget[i].updatePosition();
      }
    }

    // Handles ball input
    ball.handleInput(!firstStep, ballHeight1);
    // Check if ball is jumping
    ball.handleJumping(paddle, ballHeight1);
    // Updates ball position based on paddle position
    ball.updatePosition(paddle.x + 60);
    // Display percentage of health + Display player score
    ball.displayHealth(gameStructure);
    ball.displayScore(gameStructure);

    // Displays Ball and paddle
    paddle.display();
    ball.display(positionBeforeRotation);

    // If the player score reached a certain value, second step ends +
    // show transition screen to go to next step
    if (gameStructure.score > secondStepScoreLimit) {
      stepIsOver = true;
      secondWin = true;
      secondStep = false;
      // Pause background sound play victory sound
      backgroundSound2.pause();
      stepsVictory.setVolume(0.1);
      stepsVictory.play();
    }

    // If ball goes off the bottom of screen or player lost his whole health, game is over.
    else if (ball.y > height || gameStructure.ballOpacity <= 0) {
      stepIsOver = true;
      secondFailure = false;
      secondStep = false;
      backgroundSound2.pause();
    }
  }

  // Game third step
  else if (thirdStep) {
    if (notRotated) {
      background(thirdStepBackground);
      // Resets paddle position if ball.isJumping is true
      if (ball.isJumping) {
        paddle.x = mouseX;
        paddle.y = mouseY;
      }

      // Display barriers
      // Update barriers position. Make them loop
      // Check if ball collided barrier.
      // If so, ethier decreases player health by 20% or rotates screen 360 degrees
      for (let i = 0; i < secondBarriers.length; i++) {
        secondBarriers[i].display(positionBeforeRotation);
        secondBarriers[i].ballBarrierCollision(ball, positionBeforeRotation, gameStructure);
        if (secondBarriers[i].warning(ball, positionBeforeRotation)) {
          notRotated = false;
          ball.isJumping = false;
          warning = true;
          turnTracker = true;
          // If ball collided barrier pause the sound
          backgroundSound3.pause();
        }
        secondBarriers[i].updatePosition();
      }

      // Display targets
      // Update targets position. Make them loop
      // Check if ball collided target.
      // If so, either add to player score or player health
      for (let i = 0; i < thirdStepTarget.length; i++) {
        if (thirdStepTarget[i].id === 1) {
          thirdStepTarget[i].display();
        }
        ball.targetCollision(thirdStepTarget[i], gameStructure);
        thirdStepTarget[i].updatePosition();
      }

      // Display percent of health + Display player score
      ball.displayHealth(gameStructure);
      ball.displayScore(gameStructure);
      // Handles ball input
      ball.handleInput(thirdStep, ballHeight2);
      // Check if ball is jumping
      ball.handleJumping(paddle, ballHeight2);
      // Updates ball position based on paddle position
      ball.updatePosition(paddle.x + 60);

      // Displays Ball and paddle
      paddle.display();
      ball.display(positionBeforeRotation);

      // If player score reached a certain value, show victory screen
      if (gameStructure.score > thirdStepScoreLimit) {
        thirdStep = false;
        victoryScreen = true;
        // Pause background sound and play victory sound
        backgroundSound3.pause();
        victorySound.setVolume(0.1);
        victorySound.play();
      }
      // If ball went off the upper edge of screen or player lost his whole health
      // shows replay screen
      if (ball.y > height) {
        thirdStep = false;
        stepIsOver = true;
        thirdFailure = false;
        backgroundSound3.pause();
      } else if (gameStructure.ballOpacity <= 0) {
        thirdStep = false;
        stepIsOver = true;
        thirdFailure = false;
        backgroundSound3.pause();
      }
    } else if (warning) {
      // Display warning message
      gameStructure.displayWarningScreen();
      // When time is over, reset time, reset paddle and ball properties, rotate screen
      if (dist(gameStructure.plugX, gameStructure.plugY, gameStructure.outletX, gameStructure.outletY) < timeOver) {
        gameStructure.plugX = (width / 2) - 300;
        gameStructure.plugY = (height / 2) + 100;
        gameStructure.outletX = width / 2 + 300;
        gameStructure.outletY = (height / 2) + 100;
        warning = false;
        // Replay background sound
        backgroundSound3.setVolume(0.3);
        backgroundSound3.play();
        setupPlayer();
        if (!notRotated && turnTracker) {
          rotated = true;
        } else if (!rotated && !turnTracker) {
          notRotated = true;
        }
      }
    } else if (rotated) {
      background(thirdStepBackgroundRotated);

      // Resets paddle position if ballRotated.isJumping is true
      if (ballRotated.isJumping) {
        paddleRotated.x = mouseX;
        paddleRotated.y = mouseY;
      }

      // Display barriers and Make them loop
      // Update barriers position.
      // Check ball barrier collision. If collided, either decrease player health by 20% or rotates screen
      for (let i = 0; i < secondBarriers.length; i++) {
        secondBarriers[i].display(positionAfterRotation);
        secondBarriers[i].ballBarrierCollision(ballRotated, positionAfterRotation, gameStructure);
        if (secondBarriers[i].warning(ballRotated, positionAfterRotation)) {
          rotated = false;
          ballRotated.isJumping = false;
          warning = true;
          turnTracker = false;
          // Pause background sound if ball collided barrier
          backgroundSound3.pause();
        }
        secondBarriers[i].updatePosition();
      }

      // Display targets and Make them loop
      // Update targets position.
      // Check ball target collision. If collided either add to player score or his health
      for (let i = 0; i < thirdStepTarget.length; i++) {
        if (thirdStepTarget[i].id === 1) {
          thirdStepTarget[i].display();
        }
        ballRotated.targetCollision(thirdStepTarget[i], gameStructure);
        thirdStepTarget[i].updatePosition();
      }

      // Display percent of health + Display player score
      ballRotated.displayHealth(gameStructure);
      ballRotated.displayScore(gameStructure);
      // Handles ball input
      ballRotated.handleInput(thirdStep, ballHeight2);
      // Check if ball is jumping
      ballRotated.handleJumping(paddleRotated);
      // Updates ball position based on paddle position
      ballRotated.updatePosition(paddleRotated.x + 60);

      // Display paddle and ball
      paddleRotated.display();
      ballRotated.display(positionAfterRotation);

      // If player score is more than a certain value, shows victory screen
      if (gameStructure.score > thirdStepScoreLimit) {
        rotated = false;
        thirdStep = false;
        victoryScreen = true;
        backgroundSound3.pause();
        victorySound.setVolume(0.1);
        victorySound.play();
      }
      // If player went off the upper edge of screen or lost his whole health, shows the replay screen
      if (ballRotated.y < 0) {
        thirdStep = false;
        stepIsOver = true;
        thirdFailure = false;
        backgroundSound3.pause();
      } else if (gameStructure.ballOpacity <= 0) {
        thirdStep = false;
        stepIsOver = true;
        thirdFailure = false;
        backgroundSound3.pause();
      }
    }
  }
  // Victory screen
  else if (victoryScreen) {
    background(0);
    displayVictory();
    gameStructure.victoryDisplay();
    gameStructure.updateVictoryTextSize();
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
        if (!((countTargets + 1) === numRows)) {
          // Show next row
          showRow[countTargets + 1] = true;
        }
        // Reset sum of targets
        targetSum[countTargets] = 0;
        // Make this conditional statement for this row totally out of access
        // so that it won't be used in next round.
        hideRow[countTargets] = true;

        // If the requested number of targets was achieved,
        // sets targetIdtrue of all targets of the same row to the value that is given by
        // the isFalse array, so that it won't keep checking whether the ball overlapped the target and
        // therefore, won't play the sound
        for (let i = 0; i < targets.length; i++) {
          if (targets[i].targetId === isTrue[countTargets]) {
            targets[i].targetIdTrue = isFalse[countTargets];
          }
        }
        // Go to the next row
        countTargets++;
      }
    }
    // Display target
    if (targets[i].targetId === isTrue[countTargets] && showRow[countTargets] === true) {
      targets[i].display();
    }

    let numTarget = targetSum[countTargets];
    // Show the number of targets achieved.
    gameStructure.targetTracker(numTarget);
  }
  // If the player went through all three rows, goes to next step
  if (countTargets === numRows) {
    firstStep = false;
    stepIsOver = true;
    firstWin = true;
    // Play background sound
    backgroundSound.pause();
    stepsVictory.setVolume(0.1);
    stepsVictory.play();
  }
}

// displayVictory
//
// Display victory screen
function displayVictory() {
  let limitation = 0;
  let r = random(0, 1);
  for (let j = 0; j < bubbles.length; j++) {
    // To check whether the two circles overlapped.
    let overlapped = false;
    // Check the distance between the new circle and all the old ones. If the distance between
    // the two is less than sum of both radius, don't add the new circle to the array.
    for (let i = 0; i < bubbles.length; i++) {
      if (i !== j) {
        let otherBubble = bubbles[i];
        let d = dist(bubbles[j].x, bubbles[j].y, otherBubble.x, otherBubble.y);
        if (d < (bubbles[j].radius + otherBubble.radius) / bubbles[j].proximity) {
          overlapped = true;
          break;
        }
      }
    }
    // If is not overlapping display bubble
    if (!overlapped) {
      push();
      noStroke();
      fill(random(0, 255), random(0, 255), random(0, 255), random(0, 255));
      ellipse(CENTER, CENTER);
      ellipse(bubbles[j].x, bubbles[j].y, bubbles[j].radius, bubbles[j].radius);
      pop();
    }
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
    // firstStep = true;
    startScreen = false;
    instructionScreen = true;
    setupPlayer();
    setUpGame();
  }
}

// next()
//
// Go to next level
function next() {
  // If the distance between mouse position and
  // the next button is less than the button size reset the following values.
  if (dist(mouseX, mouseY, gameStructure.nextButton.x, gameStructure.nextButton.y) < gameStructure.nextButton.w) {
    if (instructionScreen) {
      instructionScreen = false;
      storyScreen = true;
    } else if (storyScreen) {
      storyScreen = false;
      firstStep = true;
      backgroundSound.setVolume(0.3);
      backgroundSound.loop();
    }
    setupPlayer();
    setUpGame();
  }
}

// continue()
//
// Go to next level
function continueIt() {
  // If the distance between mouse position and
  // the continue button is less than the button size reset the following values.
  if (dist(mouseX, mouseY, gameStructure.continueButton.x, gameStructure.continueButton.y) < gameStructure.continueButton.w) {
    // If player won first step, reset the following values
    if (firstWin) {
      firstStep = false;
      stepIsOver = false;
      secondStep = true;
      firstWin = false;
      backgroundSound2.setVolume(0.3);
      backgroundSound2.loop();
    } // If player won sceond step, reset the following values
    else if (secondWin) {
      secondStep = false;
      stepIsOver = false;
      thirdStep = true;
      secondWin = false;
      backgroundSound3.setVolume(0.3);
      backgroundSound3.loop();
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
  if (dist(mouseX, mouseY, gameStructure.continueButton.x, gameStructure.continueButton.y) < gameStructure.continueButton.w) {
    // If player lost first step, reset the following values
    // so that he can play the same step again
    if (!firstFailure) {
      firstStep = true;
      stepIsOver = false;
      firstFailure = true;
      backgroundSound.setVolume(0.3);
      backgroundSound.loop();
    }
    // If player lost second step, reset the following values
    // so that he can play the same step again
    else if (!secondFailure) {
      secondStep = true;
      stepIsOver = false;
      secondFailure = true;
      backgroundSound2.setVolume(0.3);
      backgroundSound2.loop();
    } else if (!thirdFailure) {
      thirdStep = true;
      stepIsOver = false;
      thirdFailure = true;
      backgroundSound3.setVolume(0.3);
      backgroundSound3.loop();
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
  } else if (instructionScreen) {
    next();
  } else if (storyScreen) {
    next();
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
      continueIt();
    } else if (!firstFailure) {
      playAgain();
    } else if (secondWin) {
      continueIt();
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
