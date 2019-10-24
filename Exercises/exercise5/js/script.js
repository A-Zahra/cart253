// Predator-Prey Simulation
// by Zahra Ahmadi
//
// Creates two predators, five real preys and eight side preys (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator can raise it's speed using the sprint key.
// The predator loses health over time, so must keep eating to survive.
// The predator can consume side preys to stay alive in order to be able to trap the real preys.
// The predator can consume each prey only once.
// The game is over once one of the predators eats 5 preys.
// The victory screen has the color of the winner predator.
// The number of preys eaten by the predator is shown on the victory screen.

// Our predator
let tiger;
let leopard;

// Whether the game started
let gameStart = false;
// Whether the start screen is shown
let startScreen = true;

// Start button object declaration
let rectProperties;

// Number of actual and side preys
let numActualPreys = 5;
let numSidePreys = 8;

// Declare an array to assign actual preys to
let actualPreys = [];
// Declare an array to assign side preys to
let sidePreys = [];

// The side and actual prey arrays of colors
let preysColor;
let sidePreysColor;

// Samples predators properties declaration
let samplePredatorL = {
  x: 0,
  y: 0,
  radius: 0
}
let samplePredatorR = {
  x: 0,
  y: 0,
  radius: 0
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and preys
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Predator objects declaration and value assignment
  tiger = new Predator(200, 200, 5, color(200, 200, 0), 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, width / 4, height / 2, 10, SHIFT);
  leopard = new Predator(width - 200, 200, 5, color(200, 0, 200), 40, 87, 83, 65, 68, width / 2 + 150, height / 2, 10, 20);

  // Actual and side prey colors value assignment
  preysColor = [
    // Orange
    color(255, 100, 10),
    // White
    color(255, 255, 255),
    // Red
    color(204, 10, 0),
    // green
    color(25, 255, 130),
    // lemon-colored
    color(255, 244, 94)
  ];

  sidePreysColor = [
    // Rouged
    color('#FF145E'),
    // Purple
    color('#A919FF'),
    // Navy Blue
    color('#2542E8'),
    // Turquoise blue
    color('#13D9E8'),
    // Grassy green
    color('#5DE813'),
    // Pink
    color('#FF76CE'),
    // Bluish Purple
    color('#77A2FF'),
    // Carrot orange
    color('#FF7A59')
  ];

  // Actual preys properties assignment to the objects and objects assignment to the array
  for (let i = 0; i < numActualPreys; i++) {
    let speed = [10, 15, 20, 25, 15];
    let radius = [35, 45, 50, 35, 55];
    let preysProperties = [{
      x: width / 2,
      y: height / 2,
      speed: speed[i],
      radius: radius[i]
    }];
    let newPrey = new Prey(preysProperties[0], preysColor[i]);
    actualPreys.push(newPrey);
  }

  // Side preys properties assignment to the objects and objects assignment to the array
  for (let i = 0; i < numSidePreys; i++) {
    let speed = [10, 12, 22, 15, 17, 25, 23, 16];
    let radius = [27, 33, 45, 48, 52, 35, 45, 57];
    let sidePreysProperties = [{
      x: width / 2,
      y: height / 2,
      speed: speed[i],
      radius: radius[i]
    }];
    let newSidePrey = new Prey(sidePreysProperties[0], sidePreysColor[i]);
    sidePreys.push(newSidePrey);
  }

  // Sample predators properties assignment
  samplePredatorL = {
    x: width / 3 - 40,
    y: height / 2 + 100,
    radius: 40
  }
  samplePredatorR = {
    x: width / 2 + 240,
    y: height / 2 + 100,
    radius: 40
  }
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  // Show start screen
  if (startScreen) {
    displayStart();
  }
  // Victory screen
  // If the tiger won
  else if (tiger.victory) {
    tigerVictory();
  }
  // If the leopard won
  else if (leopard.victory) {
    leopardVictory();
  }
  // Start the game
  else if (gameStart) {
    // Handle input for the tiger and the leopard
    tiger.handleInput();
    leopard.handleInput();

    // Move all the "animals"
    tiger.move();
    leopard.move();
    for (let i = 0; i < sidePreys.length; i++) {
      sidePreys[i].move();
    }
    for (let i = 0; i < actualPreys.length; i++) {
      actualPreys[i].move();
    }

    // Handle the tiger eating any of the prey
    for (let i = 0; i < sidePreys.length; i++) {
      tiger.handleEating(sidePreys[i]);
    }
    // Handle the leopard eating any of the prey
    for (let i = 0; i < sidePreys.length; i++) {
      leopard.handleEating(sidePreys[i]);
    }

    // Check if the leopard or the tiger ate the real preys
    for (let i = 0; i < actualPreys.length; i++) {
      tiger.checkEating(actualPreys[i]);
      leopard.checkEating(actualPreys[i]);
    }

    // Display samples of predators so that the player can recognizes themselves
    displaySample();

    // Display all the "animals"
    tiger.display();
    leopard.display();
    for (let i = 0; i < actualPreys.length; i++) {
      actualPreys[i].display();
    }
    for (let i = 0; i < sidePreys.length; i++) {
      sidePreys[i].display();
    }
  }
}

// displayStart()
//
// Display start screen
function displayStart() {
  push();
  let instruction = "INSTRUCTION";
  let description = "1. Eat your five preys to win.\n2. Each prey is counted only once\n" +
    "3. There are some side preys that are not counted.\nHowever, you can eat them to stay alive for a longer time.\n" +
    '4. Use your sprint key to raise your speed.\nRight player sprint key is "SHIFT" and left player sprint key is "CAPS LOCK".';
  let textX = width / 4;
  let instY = 200;
  let descY = 250;
  fill(255);
  textSize(30);
  textAlign(LEFT);
  text(10);
  text(instruction, textX, instY);
  textSize(25);
  text(description, textX, descY);
  pop();
  startButton();
}

// startButton()
//
// Draw start button
function startButton() {
  rectProperties = {
    x: width / 2,
    y: height / 2 + 150,
    w: 150,
    h: 80,
    fillColor: color(35, 145, 200)
  }
  push();
  noStroke();
  rectMode(CENTER);
  fill(rectProperties.fillColor);
  rect(rectProperties.x, rectProperties.y, rectProperties.w, rectProperties.h);
  fill(255);
  textSize(30);
  textAlign(CENTER);
  text("START", rectProperties.x, rectProperties.y + 10);
  pop();
}

// displaySample
//
// Draw a sample predator so that the player regonizes himself
function displaySample() {
  push();
  noStroke();

  // Tiger sample
  fill(tiger.fillColor);
  ellipse(samplePredatorL.x, samplePredatorL.y, samplePredatorL.radius * 2);
  fill(0)
  textSize(17);
  textAlign(CENTER, CENTER);
  text("TIGER", samplePredatorL.x, samplePredatorL.y + 5);

  // leopard sample
  fill(leopard.fillColor);
  ellipse(samplePredatorR.x, samplePredatorR.y, samplePredatorR.radius * 2);
  fill(0)
  textSize(15);
  textAlign(CENTER, CENTER);
  text("LEOPARD", samplePredatorR.x, samplePredatorR.y + 5);
  pop();
}

// tigerVictory
//
// Tiger victory screen
function tigerVictory() {
  push();
  background(tiger.fillColor);
  fill(0);
  textAlign(CENTER);
  textSize(30);
  text(`Good job Tiger!!\nYou won the game buddy!\nNumber of preys eaten: ${tiger.preyEaten}`, width / 2, height / 2);
  pop();
}

// leopardVictory()
//
// Leopard victory screen
function leopardVictory() {
  push();
  background(leopard.fillColor);
  fill(0);
  textAlign(CENTER);
  textSize(30);
  text(`Good job Leopard!!\nYou won the game buddy!\nNumber of preys eaten: ${leopard.preyEaten}`, width / 2, height / 2);
  pop();
}

// start()
//
// Start the game
function start() {
  // If the distance between mouse position and
  // the start button was less than the button size reset the following values.
  if (dist(mouseX, mouseY, rectProperties.x, rectProperties.y) < rectProperties.w) {
    gameStart = true;
    startScreen = false;
  }
}

// mousePressed()
//
// Here to require a click to start playing the game
function mousePressed() {
  if (!gameStart) {
    start();
  }
}
