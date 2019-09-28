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
let targetImageSize;
let targetImageRight;
let guideImageX;
let guideImageY;
let guideRectSize;
let counter;
let increase;
let targetImagejumpX;
let targetImagejumpY;

// Number of stars in the winning scene
let numStars = 1000;

// Add to the y position of stars
let addToPosition = 100;

// Declare valriables for the rolling images on the both side of the winning scene
let animalsX;
let animalsY;
let animalsRightX;
let animalsRightY;
let turnCounter;
let turnCounterRight;
let animalsSize;

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

// Decoy images x and y positions
let x;
let y;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
let numDecoys = 300;

// Keep track of whether they've won
let gameOver = false;

// Declare variable for the winning message
let textEnlargement;

// Declare variable for the short caption in the guide panel
let welcomeCaption;

// Found image
let imageFound;

// Prize button
let prizeButton;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");
  targetImageRight = loadImage("assets/images/animals-target-flipped.png");
  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-flipped-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-flipped-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-flipped-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-flipped-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-flipped-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#268048");
  imageMode(CENTER);

  //Assign x and y position values for the dog image in the guide canvas
  guideImageX = 1428;
  guideImageY = 75;
  guideRectSize = 150;

  // Once we've displayed all decoys, we choose a random location for the target
  targetX = random(0,width);
  targetY = random(0,height);
  targetImageSize = 100;

  // Assign string to the guide canvas caption
  welcomeCaption = "Can you find me??";

  // Use a for loop to draw as many decoys as we need
  for (let i = 0; i < numDecoys; i++) {
    // Choose a random location on the canvas for this decoy
    x = random(0,width);
    y = random(0,height);

    // Generate a random number we can use for probability
    let r = random();

    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough.
    // But basically each "if" and "else if" has a 10% chance of being true
    if (dist(x,y,guideImageX,guideImageY) > guideRectSize+10){
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
}

  // Show the target image if it is inside screen
  if (targetX < windowWidth-50 || targetY < windowHeight-50){
    // Draw the target image only if it's not under the red rectangle
    if (dist(targetX,targetY,guideImageX,guideImageY) > guideRectSize + 50){
      // And draw it (because it's the last thing drawn, it will always be on top)
      image(targetImage,targetX,targetY);
    }
  }
  // Otherwise reset if the target image goes off screen
  else if (targetX > windowWidth-50 || targetY > windowHeight-50){
    targetX = random(0,width);
    targetY = random(0,height);
  }

  // Small guide canvas on the top right corner of the canvas
  stroke(0);
  fill(255,0,0);
  rect(1352,15,guideRectSize,guideRectSize);
  image(targetImage,guideImageX,guideImageY);
  fill(255);
  noStroke();
  textSize(15);
  text(welcomeCaption, 1365, 140);

  // Found image
  imageFound = "HaHa, you found me!!";

  // prize button
  prizeButton = "Get your prize!";

  // Specify jumping dog image x and y position
  targetImagejumpX = 350;
  targetImagejumpY=0;
  // Sine wave elements
  counter = 1;
  // 100 iterations
  increase = Math.PI * 2 / 100;

  // To enlarge the winning message
  textEnlargement = 10;

  // Specify the animal rolling pictures x and y positions and size
  // Add an array of bouleans to make the if statement work so that is shifts images one they go
  // off the canvas
  animalsX = 130;
  animalsY = 0;
  animalsRightX = 1370;
  animalsRightY = 0;
  animalsSize = 170;
  turnCounter = [true, true, true, true, true, true];
  turnCounterRight = [true, true, true, true, true, true];
}

// draw()
//
// Displays the game over screen if the player has won,
// otherwise nothing (all the gameplay stuff is in mousePressed())
function draw() {
  //Image found
  youFoundIt();

  // Game over scene
  if (gameOver) {
    background(0);

    // The winning scene functions
    stars();
    jumpingDog();
    movingAnimalsLeft();
    movingAnimalsRight();

    // Winning message!
    textFont("sourse sans pro");
    // Limit the message enlargement
    if (textEnlargement < 150){
      textSize(textEnlargement);
    }
    textAlign(CENTER,CENTER);
    noStroke();
    fill(0,255,0);
    text("You Winned!",width/2,height/2);
    // Add to the message size
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

// Image found
function youFoundIt(){
  if ( dist(mouseX, mouseY, targetX, targetY) < targetImageSize/2 ){
    fill(255,0,0);
    stroke(10);
    ellipse(targetX,targetY,170,170);
    imageMode(CENTER);
    image(targetImage, targetX, targetY-20);
    fill(255);
    noStroke();
    textAlign(CENTER);
    text(imageFound, targetX, targetY+30);
    text(prizeButton, targetX, targetY+50);
  }
}

// Colored bouncing balls
function stars () {
  for (let i = 0; i < numStars; i++) {
    let x = random(280,(width/2)+470);
    let y = random(0,height*addToPosition);
    let starSize = random(1,13);
    fill(random(255),random(255),random(255));
    ellipse(x,y,starSize,starSize);
  }
  if (addToPosition > 2){
    addToPosition -= 3;
  }
}

// Jumping dog image
function jumpingDog () {
  // Sine wave movement
  if (targetImagejumpX < 1200){
    image(targetImage,targetImagejumpX, targetImagejumpY+100);
    targetImagejumpX += 6;
    targetImagejumpY = Math.abs(Math.pow(Math.sin(counter),3)*200);
    counter -= increase;
  }
}

// Left side rolling pictures of animals
function movingAnimalsLeft () {
  // Check if the image is inside of screen
    if(animalsY < 760){
      if (turnCounter[0]){
        image(targetImage,animalsX, animalsY,animalsSize,animalsSize);
        animalsY += 15;
        if (animalsY > 758){
          turnCounter[0] = false;
        }
      }
      else if (turnCounter[0] === false){
        if (turnCounter[1]){
          image(decoyImage1,animalsX, animalsY,animalsSize,animalsSize);
          animalsY += 15;
          if (animalsY > 758){
            turnCounter[1] = false;
          }
        }
        else if (turnCounter[1] === false){
          if (turnCounter[2]){
            image(decoyImage3,animalsX, animalsY,animalsSize,animalsSize);
            animalsY += 15;
            if (animalsY > 758){
              turnCounter[2] = false;
            }
          }
          else if (turnCounter[2] === false){
            if (turnCounter[3]){
              image(decoyImage5,animalsX, animalsY,animalsSize,animalsSize);
              animalsY += 15;
              if (animalsY > 758){
                turnCounter[3] = false;
              }
            }
            else if (turnCounter[3] === false){
              if(turnCounter[4]){
                image(decoyImage7,animalsX, animalsY,animalsSize,animalsSize);
                animalsY += 15;
                if (animalsY > 758){
                  turnCounter[4] = false;
                }
              }
              else if (turnCounter[4] === false){
                if (turnCounter[5]){
                  image(decoyImage9,animalsX, animalsY,animalsSize,animalsSize);
                  animalsY += 15;
                  if (animalsY > 758){
                    turnCounter[0] = true;
                    turnCounter[1] = true;
                    turnCounter[2] = true;
                    turnCounter[3] = true;
                    turnCounter[4] = true;
                    turnCounter[5] = true;
                  }
                }
              }
            }
          }
        }
      }
    }
    // Check if the image is of screen
    else {
      animalsY = 0;
    }
 }

// Right side rolling pictures of animals
function movingAnimalsRight() {
    // check if the image is inside the screen
    if(animalsRightY < 760){
      if (turnCounterRight[0]){
        image(targetImageRight,animalsRightX, animalsRightY,animalsSize,animalsSize);
        animalsRightY += 15;
        if (animalsRightY > 759){
          turnCounterRight[0] = false;
        }
      }
      else if (turnCounterRight[0] === false){
        if (turnCounterRight[1]){
          image(decoyImage2,animalsRightX, animalsRightY,animalsSize,animalsSize);
          animalsRightY += 15;
          if (animalsRightY > 758){
            turnCounterRight[1] = false;
          }
        }
        else if (turnCounterRight[1] === false){
          if (turnCounterRight[2]){
            image(decoyImage4,animalsRightX, animalsRightY,animalsSize,animalsSize);
            animalsRightY += 15;
            if (animalsRightY > 758){
              turnCounterRight[2] = false;
            }
          }
          else if (turnCounterRight[2] === false){
            if (turnCounterRight[3]){
              image(decoyImage6,animalsRightX, animalsRightY,animalsSize,animalsSize);
              animalsRightY += 15;
              if (animalsRightY > 758){
                turnCounterRight[3] = false;
              }
            }
            else if (turnCounterRight[3] === false){
              if(turnCounterRight[4]){
                image(decoyImage8,animalsRightX, animalsRightY,animalsSize,animalsSize);
                animalsRightY += 15;
                if (animalsRightY > 758){
                  turnCounterRight[4] = false;
                }
              }
              else if (turnCounterRight[4] === false){
                if (turnCounterRight[5]){
                  image(decoyImage10,animalsRightX, animalsRightY,animalsSize,animalsSize);
                  animalsRightY += 15;
                  if (animalsRightY > 758){
                    turnCounterRight[0] = true
                    turnCounterRight[1] = true;
                    turnCounterRight[2] = true;
                    turnCounterRight[3] = true;
                    turnCounterRight[4] = true;
                    turnCounterRight[5] = true;
                  }
                }
              }
            }
          }
        }
      }
    }
    // Check if the image is off screen
    else {
      animalsRightY = 0;
    }
}
