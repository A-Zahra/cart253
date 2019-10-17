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
let antelope;
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, width/4, height/2, 10, SHIFT);
  leopard = new Predator(width-100, 100, 5, color(200, 0, 200), 40, 87, 83, 65, 68, width/2 + 100, height/2, 10, 32);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
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
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Handle the leopard eating any of the prey
  leopard.handleEating(antelope);
  leopard.handleEating(zebra);
  leopard.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  leopard.display();
  antelope.display();
  zebra.display();
  bee.display();
}
