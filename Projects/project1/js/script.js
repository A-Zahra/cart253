"use strict";

/******************************************************

Game - Chaser
Pippin Barr

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/

// Track whether the game is over
let gameOver = false;
let startIt = true;
let firtLevel = true;
let secondLevel = true;
// Restart button properties
let restartX;
let restartY;
let restartSize;

// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 25;
let playerVX = 0;
let playerVY = 0;
let playerMaxSpeed = 2;
let playerSpeedKeeper;
// Player health
let playerHealth;
let playerMaxHealth = 255;
// Player fill color
let playerFill = 50;

// Prey position, size, velocity
let preyX;
let preyY;
let preyRadius = 25;
let preyVX;
let preyVY;
let preyMaxSpeed = 4;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 200;
// Prey x and y times
let preyTX;
let preyTY;
// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 15;

let preyEatenX ;
let preyEatenY ;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;

// Ranger men x and y position + size +
let rangerMenX;
let rangerMenY;
let rangerMenRadius;

let counterMessage;
let levelOneMessage;
let levelTwoMessage;
// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(800, 600);

  noStroke();

  // Set up restart button, player, prey and the ranger men
  setupRestart();
  setupPrey();
  setupPlayer();
  setupRangerMen();
  setupLevelRaiser();
}

// setupRangerMen()
//
// Initialises rangerMen position and size
function setupRangerMen(){
  rangerMenX = 150;
  rangerMenY = 150;
  rangerMenRadius = 30;
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
  preyTX = random(0,100);
  preyTY = random(0,100);
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

// setupLevelRaiser
//
// The content of preyEaten counter on the top left of the SCREEN
function setupLevelRaiser(){
  preyEatenX = 50;
  preyEatenY = 50;
  levelOneMessage = `Oh nooo, you were detected. Watch out the ranger men are coming!!!`;
  levelTwoMessage = `You still want more prey, run faster using your shift and control key!!!`;

}

// setupRestart()
//
// Initialises restart button values
function setupRestart(){
  restartX = width/2;
  restartY = height/2+100;
  restartSize = 50;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background("#2DB360");
console.log(gameOver);
  if (startIt){
    showGameStart();
  }
  else if (preyEaten > 15){
    winned();
  }
  else if (!gameOver) {
    drawLevelRaiser();
    getLevelHigher();

    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  }
  else {
      showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }

  //Add the ability to sprint + Make the player lose health faster
  if (keyIsDown(SHIFT)){
    playerMaxSpeed = 6;
    playerHealth = playerHealth - 0.7;
  }
  else {
    playerMaxSpeed = 2;
  }
  // Go faster, live longer
  if (preyEaten > 6){
    playerSpeedKeeper = playerMaxSpeed;
    if (keyIsDown(CONTROL)){
      playerMaxSpeed += playerSpeedKeeper;
      playerHealth += 0.6;
      preyMaxSpeed = 8;
    }
    else {
      playerMaxSpeed = 6;
      preyMaxSpeed = 4;
    }
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < -50) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  }
  else if (playerX > width+50) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < -50) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  }
  else if (playerY > height+50) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 0.5;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerRadius*2.5) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
        // Move the "new" prey to a random position
        preyX = random(0, width);
        preyY = random(0, height);
        // Give it full health
        preyHealth = preyMaxHealth;
        // Track how many prey were eaten
        preyEaten = preyEaten + 1;
    }
    if (preyRadius < 100){
      // If the player ate prey, it gets bigger by one pixel each time
      playerRadius++;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at sequential intervals

  // Set velocity based on sequential values to get a new direction
  // and speed of movement
  // Use map() to convert from the 0-1 range of the noise() function
  // to the appropriate range of velocities for the prey
  preyVX = map(noise(preyTX), 0, 1, -preyMaxSpeed, preyMaxSpeed)*2;
  preyVY = map(noise(preyTY), 0, 1, -preyMaxSpeed, preyMaxSpeed)*2;


  // Update prey position based on velocity
  preyX += preyVX;
  preyY += preyVY;

  // Add to prey time value by 0.01 per second
  preyTX += 0.01;
  preyTY += 0.01;

  // Screen wrapping
  // if (preyEaten < 5){
  //   if (preyX < 200) {
  //     setupPrey();
  //     //preyX = preyX + width;
  //   }
  //   else if (preyX > width/2+200) {
  //     setupPrey();
  //     //preyX = preyX - width;
  //   }
  //   if (preyY < 100) {
  //     setupPrey();
  //   //  preyY = preyY + height;
  //   }
  //   else if (preyY > height/2+100) {
  //     setupPrey();
  //     //preyY = preyY - height;
  //   }
  // }
    if (preyX < -50) {
      preyX = preyX + width;
    }
    else if (preyX > width+50) {
      preyX = preyX - width;
    }
    if (preyY < -50) {
      preyY = preyY + height;
    }
    else if (preyY > height+50) {
      preyY = preyY - height;
    }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  fill(preyFill, preyHealth);
  ellipse(preyX, preyY, preyRadius * 2.5);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha value based on health
function drawPlayer() {
  fill(playerFill, playerHealth);
  ellipse(playerX, playerY, playerRadius * 2.5);
}

// drawRangerMen
//
// draw ranger men on the four sides of canvas
function drawRangerMen(){
  fill("#B38E43");
  ellipse(rangerMenX,rangerMenY,rangerMenRadius*2, rangerMenRadius*2);
  ellipse((rangerMenX*4)+50,rangerMenY,rangerMenRadius*2, rangerMenRadius*2);
  ellipse(rangerMenX,height/2+rangerMenY,rangerMenRadius*2, rangerMenRadius*2);
  ellipse((rangerMenX*4)+50,height/2+rangerMenY,rangerMenRadius*2, rangerMenRadius*2);

}
function drawLevelRaiser(){
  if (preyEaten < 5 || preyEaten > 5 && preyEaten < 10 || preyEaten > 10){
    fill(0);
    textSize(25);
    textAlign(LEFT);
    text(`Number times the prey was eaten: ${preyEaten}`, preyEatenX, preyEatenY);
  }
  else if (preyEaten === 5){
    fill(0);
    textSize(20);
    textAlign(CENTER);
    text(levelOneMessage, width/2, height/2);
  }
  else if (preyEaten === 10){
    fill(0);
    textSize(20);
    textAlign(CENTER);
    text(levelTwoMessage, width/2, height/2);
  }
}
// isDetected
//
// Check if the player and the rangerMen overlapped
function isDetected(){
  if (dist(playerX, playerY, rangerMenX,rangerMenY) < playerRadius*2 ||
      dist(playerX, playerY, (rangerMenX*4)+50,rangerMenY) < playerRadius*2 ||
      dist(playerX, playerY, rangerMenX,height/2+rangerMenY) < playerRadius*2 ||
      dist(playerX, playerY,(rangerMenX*4)+50,height/2+rangerMenY) < playerRadius*2){
        playerHealth = 0;
        if (playerHealth === 0) {
          // If so, the game is over
          gameOver = true;
        }
  }
}
// start()
//
// start the game()
function drawStart(){
  fill(100,100,200);
  rectMode(CENTER);
  stroke(10);
  rect(restartX, restartY, restartSize*3, restartSize);
  fill(0);
  noStroke(20);
  textAlign(CENTER);
  textSize(20);
  text("Start", width/2,(height/2)+100);
}
// Restart
//
// restart button
function drawRestart(){
  fill(100,100,200);
  rectMode(CENTER);
  stroke(10);
  rect(restartX, restartY, restartSize*3, restartSize);
  fill(0);
  noStroke(20);
  textAlign(CENTER);
  textSize(20);
  text("Play Again!", width/2,(height/2)+100);

}

// getLevelHigher
//
// Makeing the game harder as the player eats the prey more and more
function getLevelHigher(){
  if (preyEaten < 5){
    drawLevelRaiser();
  }
  else if (preyEaten === 5){
    drawLevelRaiser();
    playerRadius = 25;
    playerHealth = playerMaxHealth;
  }
  else if (preyEaten > 5 && preyEaten < 10){
    drawLevelRaiser();
    drawRangerMen();
    // If player is detected it dies
    isDetected();
  }
  else if (preyEaten === 10){
    drawLevelRaiser();
    playerRadius = 25;
    playerHealth = playerMaxHealth;
  }
  else if (preyEaten > 10) {
    drawLevelRaiser();
    drawRangerMen();
    // If player is detected it dies
    isDetected();
  }
}
// showGameStart
//
// Display text about the game start and short instruction
function showGameStart(){
  let gameStartText = "Welcome to chaser game!\n"; // \n means "new line"
  gameStartText = "Instruction:\n";
  gameStartText = "before you died.";
  // Display it in the centre of the screen
  text(gameStartText, width / 2, height / 2);
  drawStart();
}
// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "You ate " + preyEaten + " prey\n";
  gameOverText = gameOverText + "before you died."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
  drawRestart();
}

// winned()
//
// show the winning message
function winned(){
  background("#FFA447");
  fill(0);
  noStroke();
  textSize(30);
  textAlign(CENTER);
  text("Yeayyyyy! You winned", width/2, height/2);
  drawRestart();

}

// start()
//
// start the game
function start(){
  if (dist(mouseX, mouseY, restartX, restartY) < restartSize){
    startIt = false;
    playerHealth=playerMaxHealth;
    playerRadius = 25;
    preyEaten = 0;
    setupPlayer();
    setupPrey();
    getLevelHigher();
  }
}

// restart()
//
// Restart the game
function restart(){
  if (dist(mouseX, mouseY, restartX, restartY) < restartSize){
    gameOver = false;
    playerHealth=playerMaxHealth;
    playerRadius = 25;
    preyEaten = 0;
    setupPlayer();
    setupPrey();
    getLevelHigher();
  }
}

// mousePressed()
//
// If mouse pressed run restart function
function mousePressed(){
  if (startIt === true){
    start();
  }
  else if(gameOver ===true){
    restart();
  }
  else if (preyEaten > 15){
    restart();
  }
}
