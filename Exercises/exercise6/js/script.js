"use strict";

// Predator-Prey Simulation
// by Zahra Ahmadi
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

////////////////////
// 10 ERRORS IN HERE
////////////////////

// Our predator
let tiger;

// The three prey
// Missing letter "e". I added letter 'e' at the end of the word 'antelop'.
let antelope;
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
// There wasn't a space between function and setup. So, I only added a space in between them to make the function works.
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Extra comma inside the first parenthesis.
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  // Missing the y position value. I assigned 100 to y parameter
  // so that the Zebra will have an intial value for y position just like other objects.
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  // Missing letter "d".
  background(0);

  // Handle input for the tiger
  // Handle input was not called, so the tiger wasn't able to move.
  // I added handleInput method so that it is called and enables the predator to move.
  tiger.handleInput();

  // Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();
  // Lacking the bee move method. I added the bee move method, so now it doesn't stand still.
  bee.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  // Again missing letter "e". Added letter 'e' at the end of the word 'antelop'.
  antelope.display();
  // Wrong dictation of display. I replaced "o" with "a".
  zebra.display();
  // Missing the two "ee" letters. I added them.
  bee.display();
}
