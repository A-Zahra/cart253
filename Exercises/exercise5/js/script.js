// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let tiger;
let leopard;

// The three prey
// let antelope;
// let zebra;
// let bee;
// let rabbit;

// The actual preys variable declaration as objects of an array
let prey = [
  {antelope: undefined},
  {zebra: undefined},
  {bee: undefined},
  {rabbit: undefined},
  {squirrel: undefined}
];

// The side preys variable declaration as objects of an array
let falsePrey = [
  {prey1: undefined},
  {prey2: undefined},
  {prey3: undefined},
  {prey4: undefined},
  {prey5: undefined},
  {prey6: undefined},
  {prey7: undefined},
  {prey8: undefined}
];

// The actual preys properties array like position, size, speed
let actualPrey;

// The side preys properties array like position, size, speed
let sidePreys;

// The side and actual prey arrays of colors
let actualPreyColor;
let colors;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(200, 200, 5, color(200, 200, 0), 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, width/4, height/2, 12, SHIFT);
  leopard = new Predator(width-200, 200, 5, color(200, 0, 200), 40, 87, 83, 65, 68, width/2 + 100, height/2, 12, 32);
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
  sidePreys = [
    {
      x: width/2,
      y: height/2,
      speed: 20,
      radius: 55
    },
    {
      x: width/2,
      y: height/2,
      speed: 50,
      radius: 50
    },
    {
      x: width/2,
      y: height/2,
      speed: 35,
      radius: 35
    },
    {
      x: width/2,
      y: height/2,
      speed: 60,
      radius: 60
    },
    {
      x: width/2,
      y: height/2,
      speed: 40,
      radius: 40
    },
    {
      x: width/2,
      y: height/2,
      speed: 45,
      radius: 45
    },
    {
      x: width/2,
      y: height/2,
      speed: 25,
      radius: 25
    },
    {
      x: width/2,
      y: height/2,
      speed: 35,
      radius: 35
    }
  ];
  actualPrey = [
    {
      x: width/2,
      y: height/2,
      speed: 10,
      radius: 50
    },
    {
      x: width/2,
      y: height/2,
      speed: 8,
      radius: 55
    },
    {
      x: width/2,
      y: height/2,
      speed: 20,
      radius: 40
    },
    {
      x: width/2,
      y: height/2,
      speed: 15,
      radius: 30
    },
    {
      x: width/2,
      y: height/2,
      speed: 12,
      radius: 45
    },
  ];
  for (let i = 0; i < 8; i++){
    falsePrey[i] = new Prey(sidePreys[i], colors[i]);
  }
  for (let i = 0; i < 5; i++) {
    prey[i] = new Prey(actualPrey[i], actualPreyColor[i]);
  }
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  if (tiger.victory){
    push();
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text(`Good job!!\nYou won the game buddy!\nNumber preys eaten: ${tiger.preyEaten}`, width/2, height/2);
    pop();
  }
  else if (leopard.victory) {
    push();
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text(`Good job!!\nYou won the game buddy!\nNumber preys eaten: ${leopard.preyEaten}`, width/2, height/2);
    pop();
  }
  else {


    // Handle input for the tiger and the leopard
    tiger.handleInput();
    leopard.handleInput();

    // Move all the "animals"
    tiger.move();
    leopard.move();
    for(let i = 0; i < 8; i++){
      falsePrey[i].move();
    }
    for (let i = 0; i < 5; i++) {
      prey[i].move();
    }

    // Handle the tiger eating any of the prey
    for(let i = 0; i < 8; i++){
      tiger.handleEating(falsePrey[i]);
    }

    // Handle the leopard eating any of the prey
    for(let i = 0; i < 8; i++){
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
    for(let i = 0; i < 8; i++){
      falsePrey[i].display();
    }
  }

}
