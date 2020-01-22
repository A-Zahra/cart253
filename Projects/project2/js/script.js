"use strict";
// Predator-Prey Simulation
// by Zahra Ahmadi

/****************************************************************************/
// The start screen is the first thing that is displayed.
// It includes: game story, game instruction and game elements images
// Then game starts. Two players, five goals (shared by both players)
// four success essential and eight barriers are created.
// The player chases the goal using the arrow keys and acheive them.
// The player can raise it's speed using the sprint key.
// The player loses health over time. To survive he should receive family support.
// To receive family support, he should hit the family image.
// If the player encounter barriers, he gets hesitated about his goals
//  and goals get invisible to him. To see his goals again, he should consult with friends.
// The game is over once all the goals are acheived or one of the players dies.
// If one of the players dies the winner is the one with most goals acheived.
// Each player has a victory screen designed specificly for him.
// The number of goals acheived is shown on the victory screen.
// If the player dies an end screen is shown.
/****************************************************************************/
//
/****************************************************************************/
// Reference
//
// --** Images **--
// background image:
// https://www.vectorstock.com/royalty-free-vector/modern-building-with-night-city-background-vector-8255579
//
// Friends:
// https://www.clipartmax.com/middle/m2H7H7d3d3G6K9i8_inspirational-photos-of-winnie-the-pooh-and-friends-winnie-de-pooh-sticker/
//
// Familys:
// https://shopacefamily.com/products/sticker-pack-cartoon
//
// Players:
// https://i0.wp.com/www.grfxpro.com/uploads/img_lg/20062016065344.jpg
//
// Goals:
// https://appadvice.com/app/teacher-education-stickers/1435187736

// --** Audios **--
// https://www.noiseforfun.com/
/****************************************************************************/
// Background image
let cityBackground;

// Variable which gameFeatures object would be assigned to
let game;
// Our players and their images
let leftPlayer;
let rightPlayer;
let leftPlayerImg;
let rightPlayerImg;
// victory and death sound
let bothDied;
let victorySound;

// Whether the game started or restarted
let gameStart = false;
let gameRestart = false;
// Whether the start or end screen is shown
let startScreen = true;
let victoryScreen = false;
// Start button object declaration
let rectProperties;
// Start screen sample images of players, essentials and goals
let startScreenImages;

// Number of goals, sum of goals acheived and players health rate
let numGoals = 5;
let sumGoals = 5;
let healthRate = 10;
// Declare an array to assign goals
let goals;
let hitGoal;
// Declare variables for goals images
let championship;
let education;
let marriage;
let toBeArtist;
let toBeScientist;

// Number of essentials
let numEssentials = 4;
// Declare an array to assign success essentials
let successEssentials;
// images of success essentials
let familyLeft;
let familyRight;
let hitFamily;
let friends;
let hitFriend;

// Number of barriers (Multiply by two)
let numBarriers = 4;
// Declare an array to assign barrier objects
let barrier;
// Barriers sound
let hitBarrier;
let barrierImg;

// preload()
//
// Preload all external images and audios
function preload() {
  // Images
  //
  // Background
  cityBackground = loadImage("assets/images/CityBackground.jpg");
  // Players images
  leftPlayerImg = loadImage("assets/images/Left-Player.png");
  rightPlayerImg = loadImage("assets/images/Right-Player.png");
  // Goals images
  championship = loadImage("assets/images/championship.png");
  education = loadImage("assets/images/education.png");
  marriage = loadImage("assets/images/marriage.png");
  toBeScientist = loadImage("assets/images/toBeScientist.png");
  toBeArtist = loadImage("assets/images/toBeArtist.png");
  // Essentials images
  familyLeft = loadImage("assets/images/familyLeft.png");
  familyRight = loadImage("assets/images/familyRight.png");
  friends = loadImage("assets/images/friends.png");

  // I am using the same barrier image that I did for my third project barriers
  barrierImg = loadImage("assets/images/Barrier1.png");

  // Audios
  //
  // If hit barriers...
  hitBarrier = new Audio("assets/sounds/hitBarrier.wav");
  // If hit friends...
  hitFriend = new Audio("assets/sounds/hitFriend.wav");
  // If hit family...
  hitFamily = new Audio("assets/sounds/hitFamily.wav");
  // If hit goal...
  hitGoal = new Audio("assets/sounds/hitGoal.wav");
  // If both player Died or one of them won...
  bothDied = new Audio("assets/sounds/BothDied.wav");
  victorySound = new Audio("assets/sounds/victorySound.wav");
}

// setup()
//
// Sets up a canvas
// Creates objects for the players, goals, essentials, barriers and start, victory and end screens
function setup() {
  createCanvas(windowWidth, windowHeight);
  setUpGame();
}

// setUpGame
//
// Assign all the necessary initial values to arrays, variables and objects
function setUpGame() {
  // Declare goals, barriers and success essentials variables.
  goals = [];
  barrier = [];
  successEssentials = [];

  // Assign start screen images to an object
  startScreenImages = {
    playerLeft: leftPlayerImg,
    playerRight: rightPlayerImg,
    familyLeft: familyLeft,
    familyRight: familyRight,
    friends: friends,
    championship: championship,
    education: education,
    marriage: marriage,
    toBeScientist: toBeScientist,
    toBeArtist: toBeArtist
  };

  // Game features object declaration and value assignment.
  game = new GameFeatures(width / 11, 120, 180, color(128, 89, 76), startScreenImages, barrierImg);

  // Players objects declaration and value assignment
  leftPlayer = new Player(width / 4, height / 3, 7, 70, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, width / 6, height / 2, 12, SHIFT, leftPlayerImg, 1, hitGoal);
  rightPlayer = new Player(width - 450, height / 3, 7, 70, 87, 83, 65, 68, width / 2 + 235, height / 2, 12, 20, rightPlayerImg, 2, hitGoal);

  // Goals properties assignment to an object and objects assignment to the main array
  let speed = [15, 25, 20, 50, 30];
  let radius = [35, 45, 50, 35, 55];
  let name = [championship, education, marriage, toBeScientist, toBeArtist];
  for (let i = 0; i < numGoals; i++) {
    let goalsProperties = {
      x: width / 2,
      y: height / 2,
      speed: speed[i],
      radius: radius[i],
      img: name[i]
    };
    // Declare and assign new goal object
    let newGoal = new Goal(goalsProperties);
    // Add the new goal object to the goals array
    goals.push(newGoal);
  }

  // Success essentials properties assignment to an array of objects and array assignment to the main array
  for (let i = 0; i < numEssentials; i++) {
    let essentialsProp = [
      // left side player priorities
      {
        x: width / 7,
        y: height / 3,
        img: familyLeft
      },
      {
        x: width / 7,
        y: height / 2 + 100,
        img: friends
      },
      //right side player priorities
      {
        x: width - 270,
        y: height / 3,
        img: familyRight
      },
      {
        x: width - 270,
        y: height / 2 + 100,
        img: friends
      }
    ];
    // Declare and assign new essential object
    let newEssential = new SuccessEssentials(essentialsProp[i]);
    // Add the new essential to the essentials array
    successEssentials.push(newEssential);
  }

  // Barriers properties assignment to the objects and objects assignment to the main array
  for (let i = 0; i < numBarriers; i++) {
    let barrierx = [(width / 4), (width - 350), (width / 2.2), (width - 50), (width / 2 + 50), (width / 5), (width / 2 + 100), (width - 200)];
    let barriery = [(height / 2 + 300), 50, (height / 2), (height / 2 + 100), 100, 50, (height / 2 + 150), (height - 20)];
    let barrierProperties = [{
        x: barrierx[i],
        y: barriery[i],
        w: random(120, 140),
        h: random(60, 75),
        img: barrierImg
      },
      {
        x: barrierx[4 + i],
        y: barriery[4 + i],
        w: random(60, 75),
        h: random(120, 140),
        img: barrierImg
      }
    ];
    // Declare and assign new horizental barrier object
    let horizentalBarrier = new Barriers(barrierProperties[0]);
    // Add the new horizental barrier to the barriers array
    barrier.push(horizentalBarrier);
    // Declare and assign new vertical barrier object
    let verticalBarrier = new Barriers(barrierProperties[1]);
    // Add the new vertical barrier object to the barriers array
    barrier.push(verticalBarrier);
  }
}

// draw()
//
// Handles input, movement, acheivement, and displaying for the system's objects
function draw() {
  // Background image
  background(cityBackground);

  // Show start screen
  if (startScreen) {
    // Clear the background to black
    background(0);
    game.displayStart();
  }
  // Victory screen
  else if (victoryScreen) {
    // Clear the background to black
    background(0);
    // If the left player won
    if (leftPlayer.goalGained > rightPlayer.goalGained) {
      game.leftWinnerPrize();
      game.leftPlayerVictory();
    }
    // If the right player won
    else if (leftPlayer.goalGained < rightPlayer.goalGained) {
      game.rightWinnerPrize();
      game.rightPlayerVictory();
    }
    // If both players died
    else {
      game.displayEndScreen();
    }
  }
  // Start the game
  else if (gameStart) {
    // Handle input for left and right players.
    leftPlayer.handleInput();
    rightPlayer.handleInput();

    // Move all the players and goals.
    leftPlayer.move();
    rightPlayer.move();
    for (let i = 0; i < goals.length; i++) {
      goals[i].move();
    }

    // Display goals
    goalDisplay();

    // If the player overlapped family, his health is refreshed.
    successEssentials[0].giveSupport(leftPlayer, hitFamily);
    successEssentials[2].giveSupport(rightPlayer, hitFamily);

    // If either of the players overlapped their friends, the goals become visible again.
    friendsOverlapped();
    // If players overlapped a barrier...
    barrierHit();

    // Display all the elements
    displayElements();
  }
}

// goalDisplay
//
// Check if either of the players acheived the goal and if so the the acheived goal won't be shown to the other one.
function goalDisplay() {
  for (let i = 0; i < goals.length; i++) {
    if (goals[i].isCaught === leftPlayer.playerId) {
      leftPlayer.checkAcheivement(goals[i]);
    } else if (goals[i].isCaught === rightPlayer.playerId) {
      rightPlayer.checkAcheivement(goals[i]);
    } else {
      leftPlayer.checkAcheivement(goals[i]);
      rightPlayer.checkAcheivement(goals[i]);
    }
  }
}

// friendsOverlapped
//
// If player overlapped friend's image, makes goals visible to both of them again
function friendsOverlapped() {
  if (successEssentials[1].consultFriends(leftPlayer, hitFriend) === true) {
    for (let i = 0; i < goals.length; i++) {
      goals[i].goalDisappeared = false;
    }
  } else if (successEssentials[3].consultFriends(rightPlayer, hitFriend) === true) {
    for (let i = 0; i < goals.length; i++) {
      goals[i].goalDisappeared = false;
    }
  }
}

// barrierHit
//
// If either of the players overlapped barrier, all goals become invisible to both of the players.
function barrierHit() {
  for (let i = 0; i < barrier.length; i++) {
    // If player overlapped barrier, send true
    let leftHit = barrier[i].lostGoal(leftPlayer, hitBarrier);
    let rightHit = barrier[i].lostGoal(rightPlayer, hitBarrier);
    // If either of the hits is true, goals disappear
    if (leftHit === true) {
      for (let i = 0; i < goals.length; i++) {
        goals[i].goalDisappeared = true;
      }
      break;
    } else if (rightHit === true) {
      for (let i = 0; i < goals.length; i++) {
        goals[i].goalDisappeared = true;
      }
      break;
    }
  }
}

// displayElements
//
// Display all elements of the game
function displayElements() {
  // Barriers
  for (let i = 0; i < barrier.length; i++) {
    barrier[i].display();
  }
  // Success essentials
  for (let i = 0; i < successEssentials.length; i++) {
    successEssentials[i].display();
  }
  // Goals
  for (let j = 0; j < goals.length; j++) {
    goals[j].display();
  }
  // Players
  leftPlayer.display();
  rightPlayer.display();

  // If all goals were acheived by players, or one of them died, the game ends.
  if (leftPlayer.goalGained + rightPlayer.goalGained === sumGoals) {
    victoryScreen = true;
    // Victory sound
    victorySound.play();
  } else if (leftPlayer.health < healthRate || rightPlayer.health < healthRate) {
    victoryScreen = true;
    // Death sound
    bothDied.play();
  }
}

// start()
//
// Start the game
function start() {
  // If the distance between mouse position and
  // the start button was less than the button size reset the following values.
  if (dist(mouseX, mouseY, game.startRectProperties.x, game.startRectProperties.y) < game.startRectProperties.w) {
    gameStart = true;
    startScreen = false;
  }
}

// restart()
//
// Restart the game()
function restart() {
  // If the distance between mouse position and
  // the restart button was less than the button size reset the following values.
  if (dist(mouseX, mouseY, game.RestartRectProperties.x, game.RestartRectProperties.y) < game.RestartRectProperties.w) {
    startScreen = true;
    gameStart = false;
    victoryScreen = false;
    setUpGame();
  }
}

// mousePressed()
//
// Here to require a click to start or restart playing the game
function mousePressed() {
  if (!gameStart) {
    start();
  } else if (victoryScreen) {
    restart();
  }
}
