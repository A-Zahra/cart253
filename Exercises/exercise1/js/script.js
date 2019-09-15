// Exercise 1 - Movement
// Prof: Pippin Barr
// Name: Zahra Ahmadi

// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.
// Draws a big circle at the background
// Draws a moving image(emojis) over behind the red circle
// Draws a text that follows the mouse location


// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;
let circleOpacity;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

// Declaring an image + Declaring variables to assign the image x & y coordinates and size
let emojisImage;
let emojisX;
let emojisY;
let emojisSize = 100;

// Declaring the text variable and assigning text to it + declaring x and y variables to assign the current position of the text
let hello = "Hello I am here!!";
let helloX;
let helloY;

// Diclaring the big circle position, size and opacity variables
let shapeX;
let shapeY;
let shapeOpacity;
let shapeSize = 640;

// preload()
// Displaying the image at the start of the program before anything else happens
function preload() {
  emojisImage = loadImage("assets/images/ewordemojis.png");
}

// setup()
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
  circleOpacity = 100;

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

  // We'll draw the big circle from the center bottom and set the opacity to zero
  ellipseMode(CENTER);
  shapeX = shapeSize/2;
  shapeY = (height/2) + shapeSize;
  shapeOpacity = 0;

}

// draw()
//
// Change the circle and square's positions so they move
// Draw the circle and square on screen
// Draw image on screen and change it's position so it moves
// Draw text at the current position of the mouse
// Draw a big circle at the background that covers the previous images, squares, circls and texts.
function draw() {
  // We don't fill the background so we get a drawing effect

  // Display and changing the big circle speed and opacity
  shapeY -= 1.2;
  shapeOpacity += 0.5;
  fill(86,176,182,shapeOpacity);
  ellipse(shapeX, shapeY, shapeSize, shapeSize);

  // display text at the current mouse location.
  helloX = mouseX;
  helloY = mouseY;
  fill(0,24,0);
  textSize(20);
  text (hello, helloX, helloY);

  // Move circle up and to the right
  // Make the circle transparent red gradually
  circleX += 0.9;
  circleY -= 0.9;
  circleOpacity -= 0.2;

  // Move image up and to the right
  emojisX += 0.9;
  emojisY -= 0.9;
  image (emojisImage, emojisX, emojisY, emojisSize, emojisSize);

  fill(255,0,0,circleOpacity);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 0.9;
  squareY -= 0.9;
  // Make the square transparent blue
  fill(0,0,255,90);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);
}
