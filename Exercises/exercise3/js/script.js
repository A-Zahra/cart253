"use strict";

/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally/Waldo searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
let targetX;
let targetY;
let targetImage;
let guideImageX;
let guideImageY;
let guideRectSize;
let counter;
let increase;
let targetImagejumpX;
let targetImagejumpY;
let numStars = 1000;
let addToPosition = 100;
// The ten decoy images
let decoyImage1;
let decoyImage2;
let decoyImage3;
let decoyImage4;
let decoyImage5;
let decoyImage6;
let decoyImage7;
let decoyImage8;
let decoyImage9;
let decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
let numDecoys = 100;

// Keep track of whether they've won
let gameOver = false;

let textEnlargement;
let welcomeCaption;
// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");
  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);

  // Use a for loop to draw as many decoys as we need
  for (let i = 0; i < numDecoys; i++) {
    // Choose a random location on the canvas for this decoy
    let x = random(0,width);
    let y = random(0,height);
    // Generate a random number we can use for probability
    let r = random();

    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough.
    // But basically each "if" and "else if" has a 10% chance of being true
    if (r < 0.1) {
      image(decoyImage1,x,y);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y);
    }
  }

  // Once we've displayed all decoys, we choose a random location for the target
  targetX = random(0,width);
  targetY = random(0,height);

  guideImageX = 1430;
  guideImageY = 80;
  guideRectSize = 150;

  welcomeCaption = "Can you find me??";
  // Reset if the target images goes off screen
  if (targetX > windowWidth-20 || targetY > windowHeight-20){
    targetX = random(0,width);
    targetY = random(0,height);
  }
  // Draw the target image only if it's not under the red rectangle
  if (dist(targetX,targetY,guideImageX,guideImageY) > guideRectSize + 50){
    // And draw it (because it's the last thing drawn, it will always be on top)
    image(targetImage,targetX,targetY);
  }

  stroke(0);
  fill(255,0,0);
  rect(1350,20,guideRectSize,guideRectSize);
  image(targetImage,guideImageX,guideImageY);
  fill(255);
  noStroke();
  textSize(15);
  text(welcomeCaption, 1360, 150);

  targetImagejumpX = 350;
  targetImagejumpY=0;
  counter = 1;
  // 100 iterations
  increase = Math.PI * 2 / 100;

  textEnlargement = 10;
}
// draw()
//
// Displays the game over screen if the player has won,
// otherwise nothing (all the gameplay stuff is in mousePressed())
function draw() {

  if (gameOver) {
    background(0);
    stars();
    jumpingDog();
    // Prepare our typography
    textFont("sourse sans pro");
    if (textEnlargement < 150){
      textSize(textEnlargement);
    }
    textAlign(CENTER,CENTER);
    noStroke();
    fill(0,255,0);
    //fill(random(255,0));
    // Tell them they won!
    text("You Winned!",width/2,height/2);
    textEnlargement+=5;
  }

}
// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // The mouse was clicked!
  // Check if the cursor is in the x range of the target
  // (We're subtracting the image's width/2 because we're using imageMode(CENTER) -
  // the key is we want to determine the left and right edges of the image.)
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the cursor is also in the y range of the target
    // i.e. check if it's within the top and bottom of the image
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}
function stars () {
      for (let i = 0; i < numStars; i++) {

        let x = random(0,width*addToPosition);
        let y = random(0,height*addToPosition);
        let starSize = random(1,13);
        fill(random(255),random(255),random(255));
        ellipse(x,y,starSize,starSize);
      }
      if (addToPosition > 2){
        addToPosition--;

      }

}
function jumpingDog () {
  if (targetImagejumpX < 1200){
    image(targetImage,targetImagejumpX, targetImagejumpY+100);
    targetImagejumpX += 6;
    targetImagejumpY = Math.abs(Math.pow(Math.sin(counter),3)*200);
    counter -= increase;
}
}
