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
  {rabbit: undefined}
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
    color('#FF145E'),
    color('#A919FF'),
    color('#2542E8'),
    color('#13D9E8'),
    color('#5DE813'),
    color('#FFE021'),
    color('#77A2FF'),
    color('#FF7A59')
  ];
  actualPreyColor = [
    color(255, 100, 10),
    color(255, 255, 255),
    color(255, 255, 0),
    color(25, 255, 130)
  ];
  sidePreys = [
    {
      x: width/2,
      y: height/2,
      speed: 20,
      radius: 20
    },
    {
      x: width/2,
      y: height/2,
      speed: 50,
      radius: 50,
    },
    {
      x: width/2,
      y: height/2,
      speed: 35,
      radius: 35,
    },
    {
      x: width/2,
      y: height/2,
      speed: 60,
      radius: 70,
    },
    {
      x: width/2,
      y: height/2,
      speed: 40,
      radius: 40,
    },
    {
      x: width/2,
      y: height/2,
      speed: 45,
      radius: 45,
    },
    {
      x: width/2,
      y: height/2,
      speed: 25,
      radius: 25,
    },
    {
      x: width/2,
      y: height/2,
      speed: 55,
      radius: 55,
    }
  ];
  actualPrey = [
    {
      x: width/2,
      y: height/2,
      speed: 10,
      radius: 50,
    },
    {
      x: width/2,
      y: height/2,
      speed: 8,
      radius: 60,
    },
    {
      x: width/2,
      y: height/2,
      speed: 20,
      radius: 10,
    },
    {
      x: width/2,
      y: height/2,
      speed: 15,
      radius: 30,
    }
  ];
  for (let i = 0; i < 8; i++){
    falsePrey[i] = new Prey(sidePreys[i], colors[i]);
  }
  for (let i = 0; i < 4; i++) {
    prey[i] = new Prey(actualPrey[i], actualPreyColor[i]);
  }
  // antelope = new Prey(width/2, width/2, 10, color(255, 100, 10), 50);
  // zebra = new Prey(width/2, height/2, 8, color(255, 255, 255), 60);
  // bee = new Prey(width/2, height/2, 20, color(255, 255, 0), 10);
  // rabbit = new Prey(width/2, height/2, 15, color(25, 255, 130), 30);

}


// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  // Handle input for the tiger and the leopard
  tiger.handleInput();
  leopard.handleInput();

  // Move all the "animals"
  tiger.move();
  leopard.move();
  for(let i = 0; i < 8; i++){
    falsePrey[i].move();
  }
  for (let i = 0; i < 4; i++) {
    prey[i].move();
  }
  // antelope.move();
  // zebra.move();
  // bee.move();
  // rabbit.move();

  // Handle the tiger eating any of the prey
  // tiger.handleEating(antelope);
  // tiger.handleEating(zebra);
  // tiger.handleEating(bee);
  // tiger.handleEating(rabbit);
  for(let i = 0; i < 8; i++){
    tiger.handleEating(falsePrey[i]);
  }

  // Handle the leopard eating any of the prey
  // leopard.handleEating(antelope);
  // leopard.handleEating(zebra);
  // leopard.handleEating(bee);
  // leopard.handleEating(rabbit);
  for(let i = 0; i < 8; i++){
    leopard.handleEating(falsePrey[i]);
  }

  // Check if the leopard or the tiger ate the real preys
  // leopard.checkEating(antelope);
  // leopard.checkEating(zebra);
  // leopard.checkEating(bee);
  // leopard.checkEating(rabbit);
  for (let i = 0; i < 4; i++) {
    tiger.checkEating(prey[i]);
    leopard.checkEating(prey[i]);

  }

  // Display all the "animals"
  tiger.display();
  leopard.display();
  for (let i = 0; i < 4; i++) {
    prey[i].display();
  }
  for(let i = 0; i < 8; i++){
    falsePrey[i].display();
  }
  // antelope.display();
  // zebra.display();
  // bee.display();
  // rabbit.display();
}
