/******************************************************

Game - The Artful Dodger
Pippin Barr

A simple dodging game with keyboard controls

******************************************************/

// The position and size of our avatar circle
let avatarX;
let avatarY;
let avatarSize = 50;

// The speed and velocity of our avatar circle
let avatarSpeed = 10;
let avatarVX = 0;
let avatarVY = 0;

// The position and size of the enemy circle
let enemyX;
let enemyY;
let enemySize = 50;

// Add to the speed and size of the enemy circle
let enemyAcceleration = 1;
let enemyEnlarge = 2;

// The speed and velocity of our enemy circle
let enemySpeed = 5;
let enemyVX = 5;

// How many dodges the player has made
let dodges = 0;

//dodge counter x and y position
let dodgeCounter;
let counterX = 250;
let counterY = 300;

// Declare variables to import images of animals
let smileyCat;
let smileyDog;
let cuteDog;
let cuteCate;

// Declare variables for the winner and loser message
let winnerMessage;
let loserMessage;

// Import external font +  Four animal images that appears once the player circle is inside their area
function preload () {
  dodgeCounter = loadFont("assets/fonts/Xpressive Bold.ttf");
  smileyCat = loadImage ("assets/images/smileyCat.jpg");
  smileyDog = loadImage("assets/images/smileyDog.jpg");
  cuteDog = loadImage("assets/images/cuteDog.jpg");
  cuteCat = loadImage("assets/images/cuteCat.jpeg");
}
// setup()
//
// Make the canvas, position the avatar and enemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // Winner and loser messages
  winnerMessage = "Are you winning??";
  loserMessage = "Are you losing??";
}
// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A orange background
  background("#FFB67E");

  // Background turns purple if enemyX is over 250
  if (enemyX > 250){
    background("#F5B8FF");
  }
  //Background turns purple if enemyY is over 250
  else if (enemyY > 250) {
    background("#B3FF75");
  }
  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
    // Reset enemy speed and size
    enemySpeed = 5;
    enemySize = 50;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // Increase the enemy's speed and size after each successful dodge
    enemySpeed += enemyAcceleration;
    enemySize += enemyEnlarge;
  }

  //If player goes to the top left half of the canvas, the smiley cat image appears
  //If player goes to the top right half of the canvas, the smiley dog image appears
  //If player goes to the bottom left half of the canvas, the cute dog image appears
  //If player goes to the bottom right half of the canvas, the cute cat image appears
  if (avatarX < width/2 && avatarY < height/2){
      image(smileyCat, 30, 30, 200, 150);
  }
  else if (avatarX > width/2 && avatarY < height/2){
        image(smileyDog, 270, 30, 200, 150);
  }
  else if (avatarX < width/2 && avatarY > height/2){
        image(cuteDog, 30, 320, 200, 150);
  }
  else if (avatarX > width/2 && avatarY > height/2){
        image(cuteCat, 270, 320, 200, 150);
  }

  // If player is on The middle half of the screen to the left shows the winner message
  // If player is on The middle half of the screen to the right shows the loser message
  textFont("calibri");
  textSize(25);
  fill(0);
  noStroke();
  textAlign(LEFT);
  if (avatarX < width/2 && avatarY > height/3.2 && avatarY < height/1.5){
    text(winnerMessage, 15, 260);
  }
  else if (avatarX > width/2 && avatarY > height/3.2 && avatarY < height/1.5){
    text(loserMessage, 305, 260);
  }

  // Display the number of successful dodges in the console
  console.log(dodges);

  //Black border around the canvas
  fill(0,0,0,0);
  stroke(10);
  strokeWeight(2);
  rectMode(CENTER);
  rect(250, 250, 500, 500);

  //Display the number of successful dodges
  textFont(dodgeCounter);
  textSize(150);
  fill("#2FBFFF");
  stroke(5);
  strokeWeight(4);
  textAlign(CENTER);
  text(dodges, counterX, counterY);

  // // No stroke so it looks cleaner
  // noStroke();

  // The player is red
  fill("#CC4D41");
  stroke(2);
  strokeWeight(2);
  // Draw the player as a circle
  ellipse(avatarX,avatarY,avatarSize,avatarSize);

  // The enemy is dark purple
  fill(107, 57, 130);
  stroke(2);
  strokeWeight(2);
  // Draw the enemy as a circle
  ellipse(enemyX,enemyY,enemySize,enemySize);

}
