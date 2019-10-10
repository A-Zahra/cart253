"use strict";

/******************************************************
Game - Chaser
Zahra Ahmadi

A "simple" game of cat and mouse. The player is an owl and can move with keys,
if it overlaps the (randomly moving) prey it "eat it" by sucking out its life
and adding it to its own. The player "dies" slowly over time so they have to keep
eating to stay alive.
This game has three levels and it gets harder as the game goes forward.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.
********************************************************
*References*
-------------
Ranger man images from:
https://dribbble.com/shots/3751110-Park-Rangers

Prey image from:
https://www.pngguru.com/free-transparent-background-png-clipart-knyhh

Player image from:
https://stickerprintingshop.com/animal-stickers/

Happy owl image from:
https://www.pinterest.com/pin/99290366760034733/

Angry owl image from:
https://www.canstockphoto.ca/illustration/wide-eyed-bird.html

Background sound:
https://www.playonloop.com/royalty-free-music-style/funny/

Victory screen sound:
https://www.noiseforfun.com/
*******************************************************/

// Track whether the game is over, sarted, is in the second or third level
let gameOver = false;
let startIt = true;
let firtLevel = true;
let secondLevel = true;

// Restart button x & y position, width and height
let reset = {
  X: 0,
  Y: 0,
  Size: 0
};

// Player varaible's declaration
let player = {
  // Player image, position, size, velocity, speed, condition of health
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
  MaxHealth: 170,
  // Player fill color
  Fill: 255
};

// Prey varaible's declaration
let prey = {
  // Prey and prey area positions, sizes, velocity, speed , condition of health
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
  MaxHealth: 255,
  // Prey fill color
  Fill: 255,
  // Prey x and y times
  TX: 0,
  TY: 0,
  // Amount of health obtained per frame of "eating" (overlapping) the prey
  eatHealth: 10,
  EatenX: 0,
  EatenY: 0,
  // Number of prey eaten during the game (the "score")
  Eaten: 0
};

// Ranger men and women images, x and y positions, widths and heights
let ranger = {
Women: undefined,
Men: undefined,
ManX: 0,
ManY: 0,
ManW: 0,
ManH: 0
};

// Distance between the prey and player
let distance;
let ppDistance;

// Background sound
let funnySound;
// Winning sound
let winningSound;
let victory = false;

// Counter and levels messages variable declaration
let counterMessage;
let levelOneMessage;
let levelTwoMessage;

// Happy owl image on the winning screen
let owl = {
  Image: undefined,
  ImageX: 0,
  ImageY: 0,
  ImageSize: 0
};

// Angry owl image on the gameover screen
let angryOwl = {
  Image: undefined,
  X: 0,
  Y: 0,
  Size: 0
};

// preload()
//
// Preload  external files of all character images + sound
function preload(){
  player.img = loadImage("assets/images/Player.png");
  prey.img = loadImage("assets/images/Prey.png");
  ranger.Men = loadImage("assets/images/Ranger-Man.png");
  ranger.Women = loadImage("assets/images/Ranger-woman.png");
  owl.Image = loadImage("assets/images/HappyOwl.png");
  angryOwl.Image = loadImage("assets/images/AngryOwl.png");
  funnySound = loadSound("assets/sounds/POL-follow-me-short.wav");
  winningSound = loadSound("assets/sounds/NFF-ultraviolet.wav");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(800, 600);
  noStroke();

  // Set up start and restart buttons, player, prey and the ranger men and women
  setupStart();
  setupPrey();
  setupPlayer();
  setupRangerMen();
  setupLevelRaiser();
  setupRestart();
}

// setupPrey()
//
// Initialises prey's position, velocity, noise times and health + prey's area position, width and height
function setupPrey() {
  prey.X = width / 4;
  prey.Y = height / 2;
  prey.AreaW = 720;
  prey.AreaH = 520;
  prey.AreaX = width/2 - prey.AreaW/2 + 20;
  prey.AreaY = height/2 - prey.AreaH/2 + 20;
  prey.VX = -prey.MaxSpeed;
  prey.VY = prey.MaxSpeed;
  prey.Health = prey.MaxHealth;
  prey.TX = random(0, 100);
  prey.TY = random(0, 100);
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  player.X = 3 * width / 6;
  player.Y = height / 2;
  player.Health = player.MaxHealth;
}

// setupRangerMen()
//
// Initialises ranger men and women position, width and height
function setupRangerMen(){
  ranger.ManX = 150;
  ranger.ManY = 100;
  ranger.ManW = 35;
  ranger.ManH = 35;
}

// setupStart()
//
// Reset prey, player, ranger man setup in start setup
function setupStart(){
  setupRangerMen();
  setupPrey();
  setupPlayer();
}

// setupLevelRaiser()
//
// The preyEaten counter on the top left of the screen position + The short message at the start of each level
function setupLevelRaiser(){
  prey.EatenX = 50;
  prey.EatenY = 50;
  levelOneMessage = "Oh nooo, you were detected. Watch out the ranger men are coming!!!\n"+
                    "Tip: Stay away from ranger men!!\n" +
                    "Eat the prey to go to the next level";
  levelTwoMessage = "You still want more prey, run faster!!\n"+
    "Tip: use your shift and control key at the same time!!!\n" +
    "Eat the prey to go to the next level";
}

// setupRestart()
//
// Initialises restart button position, size
function setupRestart(){
  reset.X = width/2;
  reset.Y = height/2 + 100;
  reset.Size = 50;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the start screen , introduces the game and characters
// raises the levels once the player wins a level
// When the player wins, shows the winning screen
// When the game is over, shows the game over screen.
function draw() {
  background("#2DB360");

  if (startIt){
    showGameStart();
  }
  else if (victory){
    winned();

    // Gives random position and size to the happy owl image in the winning screen
    owl.ImageX = random(0, width);
    owl.ImageY = random(0, height);
    owl.ImageSize = random(20, 150);
  }
  else if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
    drawPreyArea();

    drawLevelRaiser();
    getLevelHigher();
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

  if (prey.Eaten < 6){
    //Add the ability to sprint + Make the player lose health faster
    if (keyIsDown(SHIFT)){
        player.MaxSpeed = 6;
        player.Health = player.Health - 0.5;
    }
    else {
      player.MaxSpeed = 2;
    }
  }
  else if (prey.Eaten > 6){
    //Add the ability to sprint + Make the player lose health faster
    if (keyIsDown(SHIFT)){
        player.MaxSpeed = 8;
        player.Health = player.Health - 0.5;
    }
    else {
      player.MaxSpeed = 2;
    }
  }

  // Go faster, live longer if the Control key is pressed
  if (prey.Eaten > 12){
    player.SpeedKeeper = player.MaxSpeed;
    if (keyIsDown(CONTROL)){
      player.MaxSpeed += player.SpeedKeeper;
      player.Health += 0.4;
      prey.MaxSpeed = 14;
    }
    else {
      player.MaxSpeed = 2;
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
  if (player.X < -100) {
    // Off the left side, so add the width to reset to the right
    player.X = player.X + width;
  }
  else if (player.X > width+100) {
    // Off the right side, so subtract the width to reset to the left
    player.X = player.X - width;
  }

  if (player.Y < -100) {
    // Off the top, so add the height to reset to the bottom
    player.Y = player.Y + height;
  }
  else if (player.Y > height+100) {
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
  player.Health = player.Health - 0.4;
  // Constrain the result to a sensible range
  player.Health = constrain(player.Health, 10, player.MaxHealth);
  // Check if the player is dead (0 health)
  if (player.Health === 10) {
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
  if (d < prey.Radius*2) {
    // Increase the player health
    player.Health = player.Health + prey.eatHealth*2;
    // Constrain to the possible range
    player.Health = constrain(player.Health, 10, player.MaxHealth);
    // Reduce the prey health
    prey.Health = prey.Health - prey.eatHealth;
    // Constrain to the possible range
    prey.Health = constrain(prey.Health, 200, prey.MaxHealth);

    // Check if the prey died (health 200)
    if (prey.Health === 200) {
      // Check if it's still in the first level
      if(prey.Eaten < 6){
        // Move the "new" prey to a random position
        prey.X = random(prey.AreaX, prey.AreaX + prey.AreaW)*100;
        prey.Y = random(prey.AreaY, prey.AreaY + prey.AreaH)*100;
        // Give it full health
        prey.Health = prey.MaxHealth;
        // Track how many prey were eaten
        prey.Eaten = prey.Eaten + 1;
      }
      else {
        // Check if it's no more in the first level
        // Move the "new" prey to a random position
        prey.X = random(50, width-50);
        prey.Y = random(50, height-50);
        // Give it full health
        prey.Health = prey.MaxHealth;
        // Track how many prey were eaten
        prey.Eaten = prey.Eaten + 1;
      }
      // If prey was eaten more than 20 times, set the victory to true
      if (prey.Eaten > 20){
        victory = true;
        // Play the victory sound
        winningSound.play();
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
// Moves the prey based on the value that Perlin noise produces for velocity changes
function movePrey() {
  // Change the prey's velocity at sequential intervals

    // Set velocity based on sequential values to get a new direction
    // and speed of movement
    // Use map() to convert from the 0-1 range of the noise() function
    // to the appropriate range of velocities for the prey
    prey.VX = map(noise(prey.TX), 0, 1, -prey.MaxSpeed, prey.MaxSpeed);
    prey.VY = map(noise(prey.TY), 0, 1, -prey.MaxSpeed, prey.MaxSpeed);
    // Update prey position based on velocity
    prey.X += prey.VX;
    prey.Y += prey.VY;

    // Add to prey time's value by 0.01 per frame
    prey.TX += 0.01;
    prey.TY += 0.01;

    // Screen wrapping
    // if the prey goes off the screen, gives a random value to the prey position based on the prey area
    //so that is's again inside of the screen
    if (prey.X < prey.AreaX || prey.Y < prey.AreaY) {
      prey.X = round(random(prey.AreaX, prey.AreaX + prey.AreaW));
      prey.Y = round(random(prey.AreaY, prey.AreaY + prey.AreaH));
    }
    else if (prey.X > (prey.AreaX + prey.AreaW) || prey.Y > (prey.AreaY + prey.AreaH)) {
      prey.X = round(random(prey.AreaX, prey.AreaX + prey.AreaW));
      prey.Y = round(random(prey.AreaY, prey.AreaY + prey.AreaH));
    }
}

// drawPrey()
//
// Draw the prey image with tint based on health
function drawPrey() {
  push();
  tint(prey.Fill, prey.Health);
  image(prey.img, prey.X, prey.Y, prey.Radius*2.5, prey.Radius*2.5);
  pop();
}

// drawPreyArea()
//
// Draw the prey area
function drawPreyArea(){
  push();
  noFill();
  rectMode(CORNERS);
  rect(prey.AreaX, prey.AreaY, prey.AreaW, prey.AreaH);
  pop();
}

// drawPlayer()
//
// Draw the player image with tint value based on health
function drawPlayer() {
  push();
  tint(player.Fill, player.Health);
  image(player.img,player.X, player.Y, player.Radius * 2.5, player.Radius * 2.5);
  pop();
}

// drawRangerMen
//
// draw ranger men and and women on the four sides of the screen
function drawRangerMen(){
  tint(255);
  image(ranger.Men, ranger.ManX, ranger.ManY, ranger.ManW*3, ranger.ManH*3);
  image(ranger.Women, (ranger.ManX*3) + 100, ranger.ManY, ranger.ManW*3, ranger.ManH*3);
  image(ranger.Women, ranger.ManX, height/2 + ranger.ManY, ranger.ManW*3, ranger.ManH*3);
  image(ranger.Men, (ranger.ManX*3) + 100, height/2 + ranger.ManY, ranger.ManW*3, ranger.ManH*3);
}

// isDetected
//
// Check if the player and the rangerMen overlapped
function isDetected(){
  // if the distance between player and ranger man is more 110 decrease the player radius by 1
    distance = ranger.ManW + player.Radius;
    ppDistance;
    if ( distance < 100){
      ppDistance = distance;
      console.log(ppDistance);
    }
    else {
      ppDistance = ranger.ManW*2;
    }
  if (dist(player.X, player.Y, ranger.ManX,ranger.ManY) < ppDistance ||
      dist(player.X, player.Y, (ranger.ManX*3) + 100,ranger.ManY) < ppDistance ||
      dist(player.X, player.Y, ranger.ManX,height/2 + ranger.ManY) < ppDistance ||
      dist(player.X, player.Y,(ranger.ManX*3) + 100, height/2 + ranger.ManY) < ppDistance){
      player.Health = 0;
      if (player.Health === 0) {
        // If so, the game is over
        gameOver = true;
      }
  }
}

// drawLevelRaiser()
//
// Change the game messages based on the level the player is in
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

// drawStart()
//
// Start button, character figures, Labels under the characters
function drawStart(){
  // Draw start button
  push();
  fill(100, 100, 200);
  rectMode(CENTER);
  stroke(10);
  rect(reset.X-5, reset.Y, reset.Size*2, reset.Size);
  fill(0);
  noStroke(20);
  textAlign(CENTER);
  textSize(20);
  text("Start", (width/2) - 5,(height/2) + 102);
  // Introduce the ranger man and Woman
  // imageMode(RIGHT);
  tint(255);
  image(ranger.Women, 600, height/3 + 150, ranger.ManW*3, ranger.ManH*3);
  image(ranger.Men, (ranger.ManX*3) + 30, height/3+ranger.ManY + 50, ranger.ManW*3, ranger.ManH*3);
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
  image(player.img,player.X - 195, player.Y + 50, player.Radius*3, player.Radius*3);
  image(prey.img, prey.X - 120, prey.Y + 50, prey.Radius*3, prey.Radius*3);
  // Names label
  fill("#FFE429");
  stroke(20);
  rectMode(LEFT);
  rect(196, 500, 200, 50);
  // Label content
  fill(0);
  noStroke();
  text("Prey", 136, 502);
  text("Player", 252, 502);
  pop();
}

// drawRestart()
//
// Restart button
function drawRestart(){
  fill(100,100,200);
  rectMode(CENTER);
  stroke(10);
  rect(reset.X, reset.Y, reset.Size*3, reset.Size);
  fill(0);
  noStroke(20);
  textAlign(CENTER);
  textSize(20);
  text("Play Again!", width/2, (height/2) + 100);
}

// getLevelHigher()
//
// Go to the next level after each six times the prey is eaten by the player
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

// showGameStart()
//
// Game starting screen
function showGameStart(){
  // Set up the font
  textSize(15);
  textAlign(LEFT, CENTER);
  fill(0);
  let gameStartWelcome = "Welcome to chaser game!\n";
  let gameStartText = "*INSTRUCTION: This game has three levels.\n" +
  "In each level you face with some new options that stays with you till the end of the game.\n" +
  "You have to eat the prey continuously otherwise you die. Between each level there's a short\n" +
  "message that tells you what to do for the next one.For reading the message stays away\n" +
  "from the prey, otherwise you enter the next level without knowing what to do!!!\n" +
  "*LEVEL1: Keep SHIFT key to raise you speed.\n" +
  "*In order to go to the next level you must eat the prey 6 times\n" +
  "*LEVEL2: Eat the prey 6 more times\n" +
  "*LEVEL3: To win eat the prey for 8 times " ; // \n means "new line"
  // Display it in the centre of the screen
  push();
  textSize(25);
  textStyle(BOLD);
  text(gameStartWelcome, 95, 100);
  pop();
  push();
  textLeading(25);
  text(gameStartText, 95, 225);
  pop();
  // Draw start button
  drawStart();

}

// showGameOver()
//
// Display the game over screen!
function showGameOver() {
  background("#E84D53");
  // Set up the font
  textSize(25);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "YOU KILLED ME!!!!";
  let gameOverPreyEaten = "\nNumber of prey eaten:" + prey.Eaten;
  // Display it in the centre of the screen
  text(gameOverText, width/2, height/2+35);
  textSize(15);
  text(gameOverPreyEaten, width/2, 435);
  push();
  imageMode(CENTER);
  drawAngryOwl();
  pop();
  // Draw restart button
  drawRestart();
  // Stop sound
  funnySound.stop();

  }

  // drawAngryOwl()
  //
  // Draw the angry owl image on the gameOver screen
  function drawAngryOwl(){
  angryOwl.X = width/2;
  angryOwl.Y = 220;
  angryOwl.Size = 300;
  tint(255);
  image(angryOwl.Image, angryOwl.X, angryOwl.Y, angryOwl.Size, angryOwl.Size);
  }

// winned()
//
// show the winning screen
function winned(){
  background("#FFA447");
  fill(0);
  noStroke();
  textSize(30);
  textAlign(CENTER);
  text("Yeayyyyy! You winned", width/2, 335);
  // Draw restart button
  drawRestart();
  // Stop sound
  funnySound.stop();

  push();
  imageMode(CENTER);
  tint(255);
  image(owl.Image, width/2, 190, 270, 270);
  DrawHappyOwl(owl.ImageX, owl.ImageY, owl.ImageSize, owl.ImageSize);
  pop();
}

// DrawHappyOwl
//
// Draw the happy owl in random positions and sizes
function DrawHappyOwl(x, y, size){
  let owlX = x;
  let owlY = y;
  let owlSize = size;
  image(owl.Image, owlX, owlY, owlSize, owlSize);
}

// start()
//
// Start the game
function start(){
  if (dist(mouseX, mouseY, reset.X, reset.Y) < reset.Size){
    startIt = false;
    player.Health = player.MaxHealth;
    player.Radius = 30;
    prey.Eaten = 0;
    setupStart();
    setupPlayer();
    setupPrey();
    getLevelHigher();
    push();
    // Loop the sound
    funnySound.loop();
    pop();

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
// If mouse pressed run start or restart function based on the level the play is in
function mousePressed(){
  if (startIt === true){
    start();
  }
  else if(gameOver ===true){
    restart();
  }
  else if (victory){
    restart();
  }
}
