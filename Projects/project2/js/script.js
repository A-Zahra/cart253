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

// Declare an array to assign actual preys to
let actualPreys = [];
let lifePriorities = [];

// The side and actual prey arrays of colors
let preysColor;

// preload()
//
// Preload all external images
// setup()
//
// Sets up a canvas
// Creates objects for the predator and preys
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Predator objects declaration and value assignment
  tiger = new Predator(width / 5 + 50 , height / 3, 5, color(200, 200, 0), 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, width / 6, height / 2, 10, SHIFT);
  leopard = new Predator(width - 350, height / 3, 5, color(200, 0, 200), 40, 87, 83, 65, 68, width - 450, height / 2, 10, 20);

  //Actual and side prey colors value assignment
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
  for (let i = 0; i < 8; i++) {
    let prioritiesProp = [
    // Right side player priorities
    {
      x: width / 8,
      y: height / 4,
      // Rouged
      color: color(255,20,94)
    },
    {
      x: width / 3,
      y: height / 4,
      // Purple
      color: color(169,25,255)
    },
    {
      x: width / 8,
      y: height - 170,
      // Navy Blue
      color: color(37,66,232)
    },
    {
      x: width / 3,
      y: height - 170,
      // Turquoise blue
      color: color(93,232,19)
    },
    // Left side player priorities
    {
      x: width/2 + 250,
      y: height / 4,
      // Grassy green
      color: color(70,226,232)
    },
    {
      x: width - 200,
      y: height / 4,
      // Pink
      color: color(255,118,206)
    },
    {
      x: width/2 + 250,
      y: height - 170,
      // Bluish Purple
      color: color(119,162,255)
    },
    {
      x: width - 200,
      y: height - 170,
      // Carrot orange
      color:  color(255,122,89)

    }
  ];
    let priority = new LifeGuarantee(prioritiesProp[i]);
    lifePriorities.push(priority);
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
    // for (let i = 0; i < sidePreys.length; i++) {
    //   sidePreys[i].move();
    // }
    for (let i = 0; i < actualPreys.length; i++) {
      actualPreys[i].move();
    }

    // // Handle the tiger eating any of the prey
    // for (let i = 0; i < sidePreys.length; i++) {
    //   tiger.handleEating(sidePreys[i]);
    // }
    // // Handle the leopard eating any of the prey
    // for (let i = 0; i < sidePreys.length; i++) {
    //   leopard.handleEating(sidePreys[i]);
    // }

    // Check if the leopard or the tiger ate the real preys
    for (let i = 0; i < actualPreys.length; i++) {
      tiger.checkEating(actualPreys[i]);
      leopard.checkEating(actualPreys[i]);
    }
    for (let i = 0; i < lifePriorities.length; i++) {
      lifePriorities[i].updateHealth();
    }
    // Display all the "animals"
    for (let i = 0; i < lifePriorities.length; i++) {
      lifePriorities[i].display();
    }
    tiger.display();
    leopard.display();
    for (let i = 0; i < actualPreys.length; i++) {
      actualPreys[i].display();
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

// checkVictory
//
// check who is the winner
// function checkVictory() {
//   console.log(groupScore);
//   if (groupScore > 3) {
//     if (tiger.preyEaten > leopard.preyEaten) {
//       tiger.victory = true;
//     }
//     else if (tiger.preyEaten < leopard.preyEaten) {
//       leopard.victory = true;
//     }
//   }
// }

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
