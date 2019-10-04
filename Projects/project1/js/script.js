"use strict";

/******************************************************

Game - Chaser
Pippin Barr

A "simple" game of cat and mouse. The player is an owl and can move with keys,
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
let reset ={
  X: 0,
  Y: 0,
  Size: 0
};

let player = {
  // Player position, size, velocity
  img: undefined,
  X: 0,
  Y: 0,
  Radius: 35,
  VX: 0,
  VY: 0,
  MaxSpeed: 2,
  SpeedKeeper: 0,
  // Player health
  Health: 0,
  MaxHealth: 200,
  // Player fill color
  Fill: 255
};

let prey = {
  // Prey position, size, velocity
  img: undefined,
  preyX: 0,
  preyY: 0,
  AreaX: 0,
  AreaY: 0,
  AreaW: 0,
  AreaH: 0,
  Radius: 35,
  VX: 0,
  VY: 0,
  MaxSpeed: 4,
  // Prey health
  Health: 0,
  MaxHealth: 200,
  // Prey fill color
  Fill: 255,
  // Prey x and y times
  TX: 0,
  TY: 0,
  // Amount of health obtained per frame of "eating" (overlapping) the prey
  eatHealth: 15,
  EatenX: 0,
  EatenY: 0,
  // Number of prey eaten during the game (the "score")
  Eaten: 0
};

// Ranger men x and y position + size
let ranger = {
Women: undefined,
Men: undefined,
ManX: 0,
ManY: 0,
ManW: 0,
ManH: 0,
};

// Counter and levels messages variable declaration
let counterMessage;
let levelOneMessage;
let levelTwoMessage;

let owlImage;
let owlImageX;
let owlImageY;
let owlImageSize;

// preload()
//
// Preload  external files
function preload(){
  player.img = loadImage("assets/images/Player.png");
  prey.img = loadImage("assets/images/Prey.png");
  ranger.Men = loadImage("assets/images/Ranger-Man.png");
  ranger.Women = loadImage("assets/images/Ranger-Woman.png");
  owlImage = loadImage("assets/images/HappyOwl.png");
}
// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(800, 600);

  noStroke();

  // Set up restart button, player, prey and the ranger men
  setupPrey();
  setupPlayer();
  setupRangerMen();
  setupLevelRaiser();
  setupStart();
  setupRestart();
}

// setupRangerMen()
//
// Initialises rangerMen position and size
function setupRangerMen(){
  ranger.ManX = 150;
  ranger.ManY = 100;
  ranger.ManW = 35;
  ranger.ManH = 35;
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  prey.X = width / 5;
  prey.Y = height / 2;
  prey.AreaW = 700;
  prey.AreaH = 500;
  prey.AreaX = width/2-prey.AreaW/2;
  prey.AreaY = height/2-prey.AreaH/2;
  prey.VX = -prey.MaxSpeed;
  prey.VY = prey.MaxSpeed;
  prey.Health = prey.MaxHealth;
  prey.TX = random(0,100);
  prey.TY = random(0,100);
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  player.X = 3 * width / 5;
  player.Y = height / 2;
  player.Health = player.MaxHealth;
}

// setupLevelRaiser
//
// The content of preyEaten counter on the top left of the SCREEN
function setupLevelRaiser(){
  prey.EatenX = 50;
  prey.EatenY = 50;
  levelOneMessage = "Oh nooo, you were detected. Watch out the ranger men are coming!!!\n"+
                    "Tip: Stay away from ranger men!!\n" +
                    "Eat the prey to go to the next level";
  levelTwoMessage = "You still want more prey, run faster!!\n"+
    "Tip: use your shift and control key at the same time!!!" +
    "Eat the prey to go to the next level";

}

// setupStart()
//
// Initialises start elements
function setupStart(){
  setupRangerMen();
  setupPrey();
  setupPlayer();
}
// setupRestart()
//
// Initialises restart button values
function setupRestart(){
  reset.X = width/2;
  reset.Y = height/2+100;
  reset.Size = 50;
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

  if (startIt){
    showGameStart();
  }
  else if (prey.Eaten > 25){
    winned();
    owlImageX = random(0, width);
    owlImageY = random(0, height);
    owlImageSize = random(20, 100);
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
    drawPreyArea();
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
    player.VX = -player.MaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    player.VX = player.MaxSpeed;
  }
  else {
    player.VX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    player.VY = -player.MaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    player.VY = player.MaxSpeed;
  }
  else {
    player.VY = 0;
  }

  //Add the ability to sprint + Make the player lose health faster
  if (keyIsDown(SHIFT)){
      player.MaxSpeed = 6;
      player.Health = player.Health - 0.7;
  }
  else {
    player.MaxSpeed = 2;
  }

  // Go faster, live longer if the Control key is pressed
  if (prey.Eaten > 6){
    player.SpeedKeeper = player.MaxSpeed;
    if (keyIsDown(CONTROL)){
      player.MaxSpeed += player.SpeedKeeper;
      player.Health += 0.6;
      prey.MaxSpeed = 9;
    }
    else {
      player.MaxSpeed = 6;
      prey.MaxSpeed = 4;
    }
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  player.X = player.X + player.VX;
  player.Y = player.Y + player.VY;

  // Wrap when player goes off the canvas
  if (player.X < -50) {
    // Off the left side, so add the width to reset to the right
    player.X = player.X + width;
  }
  else if (player.X > width+50) {
    // Off the right side, so subtract the width to reset to the left
    player.X = player.X - width;
  }

  if (player.Y < -50) {
    // Off the top, so add the height to reset to the bottom
    player.Y = player.Y + height;
  }
  else if (player.Y > height+50) {
    // Off the bottom, so subtract the height to reset to the top
    player.Y = player.Y - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  player.Health = player.Health - 0.5;
  // Constrain the result to a sensible range
  player.Health = constrain(player.Health, 0, player.MaxHealth);
  // Check if the player is dead (0 health)
  if (player.Health === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(player.X, player.Y, prey.X, prey.Y);
  // Check if it's an overlap
  if (d < player.Radius*2) {
    // Increase the player health
    player.Health = player.Health + prey.eatHealth;
    // Constrain to the possible range
    player.Health = constrain(player.Health, 0, player.MaxHealth);
    // Reduce the prey health
    prey.Health = prey.Health - prey.eatHealth;
    // Constrain to the possible range
    prey.Health = constrain(prey.Health, 100, prey.MaxHealth);

    // Check if the prey died (health 0)
    if (prey.Health === 100) {
      if(prey.Eaten < 6){
        // Move the "new" prey to a random position
        prey.X = random(prey.AreaX, prey.AreaX+prey.AreaW);
        prey.Y = random(prey.AreaY, prey.AreaY+prey.AreaH);
        // Give it full health
        prey.Health = prey.MaxHealth;
        // Track how many prey were eaten
        prey.Eaten = prey.Eaten + 1;
      }
      else {
        // Move the "new" prey to a random position
        prey.X = random(50, width-50);
        prey.Y = random(50, height-50);
        // Give it full health
        prey.Health = prey.MaxHealth;
        // Track how many prey were eaten
        prey.Eaten = prey.Eaten + 1;
      }
    }
    if (player.Radius < 60){
      // If the player ate prey, it gets bigger by one pixel each time
      player.Radius++;
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
  prey.VX = map(noise(prey.TX), 0, 1, -prey.MaxSpeed, prey.MaxSpeed)*2;
  prey.VY = map(noise(prey.TY), 0, 1, -prey.MaxSpeed, prey.MaxSpeed)*2;

  // Update prey position based on velocity
  prey.X += prey.VX;
  prey.Y += prey.VY;

  // Add to prey time value by 0.01 per second
  prey.TX += 0.01;
  prey.TY += 0.01;

  // Screen wrapping
    if (prey.X < prey.AreaX) {
      prey.X = prey.X + prey.AreaW;
    }
    else if (prey.X > prey.AreaX+prey.AreaW) {
      prey.X = prey.X - prey.AreaW;
    }
    if (prey.Y < prey.AreaY) {
      prey.Y = prey.Y + prey.AreaH;
    }
    else if (prey.Y > prey.AreaY+(prey.AreaH)) {
      prey.Y = prey.Y - prey.AreaH;
    }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  tint(prey.Fill, prey.Health);
  image(prey.img, prey.X, prey.Y, prey.Radius*2.5, prey.Radius*2.5);
}

function drawPreyArea(){
  push();
  noFill();

  rectMode(CORNER);
  rect(prey.AreaX, prey.AreaY, prey.AreaW, prey.AreaH);
  pop();
}
// drawPlayer()
//
// Draw the player as an ellipse with alpha value based on health
function drawPlayer() {
  tint(player.Fill, player.Health);
  image(player.img,player.X, player.Y, player.Radius * 2.5, player.Radius * 2.5);

}

// drawRangerMen
//
// draw ranger men on the four sides of canvas
function drawRangerMen(){
  tint(255);
  image(ranger.Men, ranger.ManX, ranger.ManY, ranger.ManW*3, ranger.ManH*3);
  image(ranger.Women, (ranger.ManX*3)+100, ranger.ManY, ranger.ManW*3, ranger.ManH*3);
  image(ranger.Women, ranger.ManX, height/2+ranger.ManY, ranger.ManW*3, ranger.ManH*3);
  image(ranger.Men, (ranger.ManX*3)+100, height/2+ranger.ManY, ranger.ManW*3, ranger.ManH*3);

}
function drawLevelRaiser(){
  if (prey.Eaten < 6 || prey.Eaten > 6 && prey.Eaten < 12 || prey.Eaten > 12){
    fill(0);
    textSize(25);
    textAlign(LEFT);
    text(`Number times the prey was eaten: ${prey.Eaten}`, prey.EatenX, prey.EatenY);
  }
  else if (prey.Eaten === 6){
    fill(0);
    textSize(20);
    textAlign(CENTER);
    text(levelOneMessage, width/2, height/2);
  }
  else if (prey.Eaten === 12){
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
  if (dist(player.X, player.Y, ranger.ManX,ranger.ManY) < player.Radius*2 ||
      dist(player.X, player.Y, (ranger.ManX*3)+100,ranger.ManY) < player.Radius*2 ||
      dist(player.X, player.Y, ranger.ManX,height/2+ranger.ManY) < player.Radius*2 ||
      dist(player.X, player.Y,(ranger.ManX*3)+100,height/2+ranger.ManY) < player.Radius*2){
        player.Health = 0;
        if (player.Health === 0) {
          // If so, the game is over
          gameOver = true;
        }
  }
}

// start()
//
// start the game()
function drawStart(){
  // Draw start button
  push();
  fill(100,100,200);
  rectMode(CENTER);
  stroke(10);
  rect(reset.X-5, reset.Y, reset.Size*2, reset.Size);
  fill(0);
  noStroke(20);
  textAlign(CENTER);
  textSize(20);
  text("Start", (width/2)-5,(height/2)+102);
  // Introduce the ranger man and Woman
  // imageMode(RIGHT);
  tint(255);
  image(ranger.Women, 600, height/3+150, ranger.ManW*3, ranger.ManH*3);
  image(ranger.Men, (ranger.ManX*3)+30, height/3+ranger.ManY+50, ranger.ManW*3, ranger.ManH*3);
  // Name label
  fill("#FFE429");
  stroke(20);
  rectMode(LEFT);
  rect(595, 500, 200, 50);
  fill(0);
  // Label content
  noStroke();
  text("Ranger mans", 600, 502);
  // Introduce the prey and player
  imageMode(LEFT);
  image(player.img,player.X-270, player.Y+50, player.Radius*3, player.Radius*3);
  image(prey.img, prey.X-75, prey.Y+50, prey.Radius*3, prey.Radius*3);
  // Names label
  fill("#FFE429");
  stroke(20);
  rectMode(LEFT);
  rect(200, 500, 200, 50);
  // Label content
  fill(0);
  noStroke();
  text("Prey", 140, 502);
  text("Player", 255, 502);
  pop();
}

// Restart
//
// restart button
function drawRestart(){
  fill(100,100,200);
  rectMode(CENTER);
  stroke(10);
  rect(reset.X, reset.Y, reset.Size*3, reset.Size);
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
  if (prey.Eaten < 6){
    drawLevelRaiser();
  }
  else if (prey.Eaten === 6){
    drawLevelRaiser();
    player.Radius = 35;
    player.Health = player.MaxHealth + 50;
  }
  else if (prey.Eaten > 6 && prey.Eaten < 12){
    drawLevelRaiser();
    drawRangerMen();
    // If player is detected it dies
    isDetected();
  }
  else if (prey.Eaten === 12){
    drawLevelRaiser();
    player.Radius = 35;
    player.Health = player.MaxHealth + 50;
  }
  else if (prey.Eaten > 12) {
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
  // Set up the font
  textSize(22);
  textAlign(LEFT, CENTER);
  fill(0);
  let gameStartWelcome = "Welcome to chaser game!\n";
  let gameStartText = "Instruction: This game has three levels.\n" +
  "In each level you face with some new options that\n" +
  "stays with you till the end of the game.\n" +
  "Level1: Keep SHIFT key to raise you speed.\n" +
  "In order to go to the next level you must eat the prey 6 times\n" +
  "Level2: Eat the prey 6 more times\n" +
  "Level3: To win eat the prey for 8 times " ; // \n means "new line"
  // Display it in the centre of the screen
  push();
  textSize(25);
  textStyle(BOLD);
  text(gameStartWelcome, 95, 110);
  pop();
  text(gameStartText, 95, 220);
  // Draw start button
  drawStart();
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  background("#E84D53");
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "You ate " + prey.Eaten + " prey\n";
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
  text("Yeayyyyy! You winned", width/2, 310);
  drawRestart();
  push();
  imageMode(CENTER);
  image(owlImage, width/2, 170, 250, 250);
  happyOwl(owlImageX, owlImageY, owlImageSize, owlImageSize);
  pop();
}

function happyOwl(x, y, size){
  let owlX = x;
  let owlY = y;
  let owlSize = size;
  image(owlImage, owlX, owlY, owlSize, owlSize);
}
// start()
//
// start the game
function start(){
  if (dist(mouseX, mouseY, reset.X, reset.Y) < reset.Size){
    startIt = false;
    player.Health=player.MaxHealth;
    player.Radius = 30;
    prey.Eaten = 0;
    setupStart();
    setupPlayer();
    setupPrey();
    getLevelHigher();
  }
}

// restart()
//
// Restart the game
function restart(){
  if (dist(mouseX, mouseY, reset.X, reset.Y) < reset.Size){
    gameOver = false;
    startIt = true;
    player.Health=player.MaxHealth;
    player.Radius = 30;
    prey.Eaten = 0;
    setupPlayer();
    setupPrey();
    setupStart();
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
  else if (prey.Eaten > 25){
    restart();
  }
}
