// Predator-Prey Simulation
// by Zahra Ahmadi
//
// Creates two predators, five real preys and eight side preys (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator can raise it's speed using the sprint key.
// The predator loses health over time, so must keep eating to survive.
// The predator can consume side preys to stay alive in order to be able to trap the real preys.
// The predator can consume each prey only once.
// The game is over once one of the predators finishes it's prey eating process sooner.
// The victory screen has the color of the winner predator.
// The number of preys eaten by the predator is shown on the victory screen.

// Our predator
let tiger;
let leopard;

// The actual preys variable declaration as objects of an array
let prey = [{
    antelope: undefined
  },
  {
    zebra: undefined
  },
  {
    bee: undefined
  },
  {
    rabbit: undefined
  },
  {
    squirrel: undefined
  }
];

// The side preys variable declaration as objects of an array
let falsePrey = [{
    prey1: undefined
  },
  {
    prey2: undefined
  },
  {
    prey3: undefined
  },
  {
    prey4: undefined
  },
  {
    prey5: undefined
  },
  {
    prey6: undefined
  },
  {
    prey7: undefined
  },
  {
    prey8: undefined
  }
];

// The actual preys properties like their position, size, speed
let actualPrey;

// The side preys properties like their position, size, speed
let sidePreys;

// The side and actual prey arrays of colors
let actualPreyColor;
let colors;

// Samples predators properties like their position and size
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
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Predator objects declaration and value assignment
  tiger = new Predator(200, 200, 5, color(200, 200, 0), 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, width / 4, height / 2, 12, SHIFT);
  leopard = new Predator(width - 200, 200, 5, color(200, 0, 200), 40, 87, 83, 65, 68, width / 2 + 150, height / 2, 12, 32);

  // Actual and side prey color declaration and value assignment
  actualPreyColor = [
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

  colors = [
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

  // Actual preys objects values assignment
  actualPrey = [{
      x: width / 2,
      y: height / 2,
      speed: 10,
      radius: 50
    },
    {
      x: width / 2,
      y: height / 2,
      speed: 8,
      radius: 55
    },
    {
      x: width / 2,
      y: height / 2,
      speed: 20,
      radius: 40
    },
    {
      x: width / 2,
      y: height / 2,
      speed: 15,
      radius: 30
    },
    {
      x: width / 2,
      y: height / 2,
      speed: 12,
      radius: 45
    },
  ];

  // Side preys objects values assignment
  sidePreys = [{
      x: width / 2,
      y: height / 2,
      speed: 20,
      radius: 55
    },
    {
      x: width / 2,
      y: height / 2,
      speed: 50,
      radius: 50
    },
    {
      x: width / 2,
      y: height / 2,
      speed: 35,
      radius: 35
    },
    {
      x: width / 2,
      y: height / 2,
      speed: 60,
      radius: 60
    },
    {
      x: width / 2,
      y: height / 2,
      speed: 40,
      radius: 40
    },
    {
      x: width / 2,
      y: height / 2,
      speed: 45,
      radius: 45
    },
    {
      x: width / 2,
      y: height / 2,
      speed: 25,
      radius: 25
    },
    {
      x: width / 2,
      y: height / 2,
      speed: 35,
      radius: 35
    }
  ];

  // side and actual preys properties assignment to the objects inside the class
  for (let i = 0; i < 5; i++) {
    prey[i] = new Prey(actualPrey[i], actualPreyColor[i]);
  }
  for (let i = 0; i < 8; i++) {
    falsePrey[i] = new Prey(sidePreys[i], colors[i]);
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

  // Victory screen
  // If the tiger won
  if (tiger.victory) {
    tigerVictory();
  }
  // If the leopard won
  else if (leopard.victory) {
    leopardVictory();
  } else {
    // Handle input for the tiger and the leopard
    tiger.handleInput();
    leopard.handleInput();

    // Move all the "animals"
    tiger.move();
    leopard.move();
    for (let i = 0; i < 8; i++) {
      falsePrey[i].move();
    }
    for (let i = 0; i < 5; i++) {
      prey[i].move();
    }

    // Handle the tiger eating any of the prey
    for (let i = 0; i < 8; i++) {
      tiger.handleEating(falsePrey[i]);
    }

    // Handle the leopard eating any of the prey
    for (let i = 0; i < 8; i++) {
      leopard.handleEating(falsePrey[i]);
    }

    // Check if the leopard or the tiger ate the real preys
    for (let i = 0; i < 5; i++) {
      tiger.checkEating(prey[i]);
      leopard.checkEating(prey[i]);
    }

    // Display all the "animals"
    tiger.display();
    leopard.display();
    for (let i = 0; i < 5; i++) {
      prey[i].display();
    }
    for (let i = 0; i < 8; i++) {
      falsePrey[i].display();
    }
    // Display samples of predators so that the player can recognizes themselves
    displaySample();
  }
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
    textAlign(CENTER);
    text("TIGER", samplePredatorL.x, samplePredatorL.y + 5);

    // leopard sample
    fill(leopard.fillColor);
    ellipse(samplePredatorR.x, samplePredatorR.y, samplePredatorR.radius * 2);
    fill(0)
    textSize(15);
    textAlign(CENTER);
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
