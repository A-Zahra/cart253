// Exercise 1 - Movement
// Pippin Barr
//
// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

// Declaring an image + Declaring variables to assign the image x & y coordinates and size
let emojisImage;
let emojisX;
let emojisY;
let emojisSize = 100;
// preload()

// Displaying the image at the start of the program before anything else happens
function preload() {
  emojisImage = loadImage("assets/images/ewordemojis.png");
}
// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);
  // Start the image off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  emojisX = -emojisSize/2;
  emojisY = height + emojisSize/2;
  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;
  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;

  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this
  noStroke();
  // We'll draw image from the center
  imageMode(CENTER);
}


// draw()
//
// Change the circle and square's positions so they move
// Draw the circle and square on screen

function draw() {
  // We don't fill the background so we get a drawing effect
  // Move image up and to the right
  emojisX += 1;
  emojisY -= 1;
  image (emojisImage, emojisX, emojisY, emojisSize, emojisSize);
  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);
}
