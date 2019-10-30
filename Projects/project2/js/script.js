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

// Our players
let leftPlayer;
let rightPlayer;
let leftPlayerImg;
let rightPlayerImg

// Whether the game started
let gameStart = false;
let gameRestart = false;
// Whether the start screen is shown
let startScreen = true;
let endScreen = true;


// Start button object declaration
let rectProperties;

// Number of actual and side preys
let numActualPreys = 5;

// Declare an array to assign actual preys to
let actualPreys = [];
let lifePriorities = [];
let familyLeft;
let familyRight;
let skatingLeft;
let skatingRight;
let cinema;
let park;
let friends;
let freeStudy;

// The side and actual prey arrays of colors
let preysColor;

// preload()
//
// Preload all external images
function preload() {
  leftPlayerImg = loadImage ("assets/images/Left-Player.png");
  rightPlayerImg = loadImage ("assets/images/Right-Player.png");

  familyLeft = loadImage ("assets/images/familyLeft.png");
  familyRight = loadImage ("assets/images/familyRight.png");
  skatingLeft = loadImage ("assets/images/Skeleton.png");
  skatingRight = loadImage ("assets/images/skatingOwl.png");
  cinema = loadImage ("assets/images/cinema.png");
  park = loadImage ("assets/images/park.png");
  friends = loadImage ("assets/images/friends.png");
  freeStudy = loadImage ("assets/images/novels.png");

}
// setup()
//
// Sets up a canvas
// Creates objects for the predator and preys
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Predator objects declaration and value assignment
  leftPlayer = new Predator(width / 6 , height / 3, 5, color(200, 200, 0), 70, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, width / 6, height / 2, 10, SHIFT, leftPlayerImg);
  rightPlayer = new Predator(width - 470, height / 3, 5, color(200, 0, 200), 70, 87, 83, 65, 68, width - 470, height / 2, 10, 20, rightPlayerImg);

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
      x: width / 10,
      y: height / 5,
      // Rouged
      img: familyLeft
    },
    {
      x: width / 3.5,
      y: height / 5,
      // Purple
      img: skatingLeft
    },
    {
      x: width / 10,
      y: height - 260,
      // Navy Blue
      img: park
    },
    {
      x: width / 3.5,
      y: height - 260,
      // Turquoise blue
      img: friends
    },

    // Left side player priorities
    {
      x: width/2 + 170,
      y: height / 5,
      // Grassy green
      img: familyRight
    },
    {
      x: width - 300,
      y: height / 5,
      // Pink
      img: skatingRight
    },
    {
      x: width/2 + 170,
      y: height - 260,
      // Bluish Purple
      img: freeStudy
    },
    {
      x: width - 300,
      y: height - 260,
      // Carrot orange
      img: cinema
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
  // If the left player won
  else if (leftPlayer.victory) {
    leftPlayerVictory();
  }
  // If the right player won
  else if (rightPlayer.victory) {
    rightPlayerVictory();
  }
  // Start the game
  else if (gameStart) {
    // Handle input for the tiger and the leopard
    leftPlayer.handleInput();
    rightPlayer.handleInput();

    // Move all the "animals"
    leftPlayer.move();
    rightPlayer.move();
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
      leftPlayer.checkEating(actualPreys[i]);
      rightPlayer.checkEating(actualPreys[i]);
    }
    // for (let i = 0; i < lifePriorities.length; i++) {
    //   lifePriorities[i].updateHealth();
    // }
    // Display all the "animals"
    for (let i = 0; i < lifePriorities.length; i++) {
      lifePriorities[i].display();
    }
    leftPlayer.display();
    rightPlayer.display();
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
  let instruction = "GAME STORY : REAL LIFE ";
  let description = "This game is about human real life.\nAs a player you are going to follow your goals in your life.\n" +
  "Besides that You have four main priorities in your life.\nYou should take care of them while you are following your goals.\n" +
  "Otherwise, you lose the game. There are also some\nbarriers in your way that if you hit them, it slows you down.\n" +
  "The winner is the one who's been able to save more priorities and more goals. "
  "Hint: To achieve your goals there is a key that can be used to sprint (Left Player: SHIFT / Right Player: CAPS LOCK).";
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



// tigerVictory
//
// Tiger victory screen
function leftPlayerVictory() {
  push();
  background(leftPlayer.fillColor);
  fill(0);
  textAlign(CENTER);
  textSize(30);
  text(`Good job left player!!\nYou won the game buddy!\nNumber of goals achieved: ${leftPlayer.preyEaten}`, width / 2, height / 2);
  restartButton();
  pop();

}

// leopardVictory()
//
// Leopard victory screen
function rightPlayerVictory() {
  push();
  background(rightPlayer.fillColor);
  fill(0);
  textAlign(CENTER);
  textSize(30);
  text(`Good job right player!!\nYou won the game buddy!\nNumber of goals achieved: ${rightPlayer.preyEaten}`, width / 2, height / 2);
  restartButton();
  pop();
}

// restartButton()
//
// Draw restart button
function restartButton() {
  rectProperties = {
    x: width / 2,
    y: height / 2 + 170,
    w: 180,
    h: 100,
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
  text("RESTART", rectProperties.x, rectProperties.y + 10);
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

// restart()
//
// Restart the game()
function restart() {
  // If the distance between mouse position and
  // the restart button was less than the button size reset the following values.
  if (dist(mouseX, mouseY, rectProperties.x, rectProperties.y) < rectProperties.w) {
    startScreen = true;
    leftPlayer.victory = false;
    rightPlayer.victory = false;
    gameStart = false;
    leftPlayer.preyEaten = 0;
    rightPlayer.preyEaten = 0;
  }
}

// mousePressed()
//
// Here to require a click to start playing the game
function mousePressed() {
  if (!gameStart) {
    start();
  }
  else if (leftPlayer.victory || rightPlayer.victory) {
    restart();
  }
}
