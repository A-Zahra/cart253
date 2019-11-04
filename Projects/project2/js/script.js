// Predator-Prey Simulation
// by Zahra Ahmadi

/****************************************************************************/
// The start screen is shown. It includes: game story and game instruction
// Creates two players, five goals (shared by both players)
// The player chases the goal using the arrow keys and acheive them.
// The player can raise it's speed using the sprint key.
// The player loses health over time. To survive he should receive family support.
// To receive family support, he should go to where they are placed.
// If the player encounter barriers, he gets hesitated about his goals and goals get invisible to him.
// To see his goals again, he should consult with friends.
// The game is over once all the goals are acheived or one of the players dies.
// Each player has a victory screen designed specificly for him.
// The number of goals acheived is shown on the victory screen.
// If the player dies an end screen is shown.
/****************************************************************************/

// Our players and their images
let leftPlayer;
let rightPlayer;
let leftPlayerImg;
let rightPlayerImg;

// Whether the game started or restarted
let gameStart = false;
let gameRestart = false;
// Whether the start or end screen is shown
let startScreen = true;
let endScreen = false;
// Start button object declaration
let rectProperties;

// Number of goals
let numGoals = 5;
// Declare an array to assign goals to
let goals = [];
// The goals array of colors
let goalsColor;

// Number of essentials
let numEssentials = 6;
// Declare an array to assign success essentials to
let successEssentials = [];
// images of success essentials
let familyLeft;
let familyRight;
let skatingLeft;
let skatingRight;
let cinema;
let park;
let friends;
let freeStudy;

// Number of barriers (Multiply by two)
let numBarriers = 4;
// Declare an array to assign barrier objects to
let barrier = [];


// preload()
//
// Preload all external images
function preload() {
  // Players images
  leftPlayerImg = loadImage("assets/images/Left-Player.png");
  rightPlayerImg = loadImage("assets/images/Right-Player.png");
  // Essentials images
  familyLeft = loadImage("assets/images/familyLeft.png");
  familyRight = loadImage("assets/images/familyRight.png");
  skatingLeft = loadImage("assets/images/Skeleton.png");
  skatingRight = loadImage("assets/images/skatingOwl.png");
  cinema = loadImage("assets/images/cinema.png");
  park = loadImage("assets/images/park.png");
  friends = loadImage("assets/images/friends.png");
  freeStudy = loadImage("assets/images/novels.png");
}

// setup()
//
// Sets up a canvas
// Creates objects for the players, goals, essentials, barriers
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Game start and end screen objects declaration and assignment
  game = new GameFeatures(width / 4, 200, 250, 255);

  // Players objects declaration and value assignment
  leftPlayer = new Predator(width / 4, height / 3, 5, color(200, 200, 0), 70, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, width / 6, height / 2, 10, SHIFT, leftPlayerImg);
  rightPlayer = new Predator(width - 450, height / 3, 5, color(200, 0, 200), 70, 87, 83, 65, 68, width / 2 + 200, height / 2, 10, 20, rightPlayerImg);

  //Goals colors value assignment
  goalsColor = [
    // Orange
    color(255, 100, 10),
    // White
    color(255, 255, 255),
    // Red
    color(204, 10, 0),
    // green
    color(25, 255, 130),
    // lemon-colored
    color(255, 244, 94)
  ];

  // Goals properties assignment to the objects and objects assignment to the array
  for (let i = 0; i < numGoals; i++) {
    let speed = [15, 25, 20, 55, 30];
    let radius = [35, 45, 50, 35, 55];
    let goalsProperties = [{
      x: width / 2,
      y: height / 2,
      speed: speed[i],
      radius: radius[i],
      opacity: 0
    }];
    // Declare and assign new goal object
    let newGoal = new Prey(goalsProperties[0], goalsColor[i]);
    // Add the new goal object to the goals array
    goals.push(newGoal);
  }

  // Success essentials properties assignment to the objects and objects assignment to the array
  for (let i = 0; i < numEssentials; i++) {
    let essentialsProp = [
      // left side player priorities
      {
        x: width / 7,
        y: height / 3.5,
        img: familyLeft
      },
      {
        x: width / 7,
        y: height / 2.05,
        img: freeStudy
      },
      {
        x: width / 7,
        y: height / 2 + 150,
        img: friends
      },
      // right side player priorities
      {
        x: width - 270,
        y: height / 3.5,
        img: familyRight
      },
      {
        x: width - 270,
        y: height / 2.05,
        img: freeStudy
      },
      {
        x: width - 270,
        y: height / 2 + 150,
        img: friends
      }
    ];
    // Declare and assign new essential object
    let newEssential = new LifeGuarantee(essentialsProp[i]);
    // Add the new essential to the essentials array
    successEssentials.push(newEssential);
  }

  // Barriers properties assignment to the objects and objects assignment to the array
  for (let i = 0; i < numBarriers; i++) {
    let barrierx = [(width / 4), 20, (width / 2), (width - 50), (width / 2 + 50), (width / 5), (width / 2 + 100), (width - 200)];
    let barriery = [(height / 2 + 300), (height / 3), (height / 2), (height / 2 + 100), 100, 10, (height / 2 + 150), (height - 20)];
    let barrierProperties = [{
        x: barrierx[i],
        y: barriery[i],
        w: random(50, 100),
        h: random(30, 50)
      },
      {
        x: barrierx[4 + i],
        y: barriery[4 + i],
        w: random(30, 50),
        h: random(50, 100)
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
// Handles input, movement, eating, and displaying for the system's objects
function draw() {

  // Clear the background to black
  background(0);

  // Show start screen
  if (startScreen) {
    game.displayStart();
  }
  // Victory screen
  else if (endScreen) {
    // If the left player won
    if (leftPlayer.preyEaten > rightPlayer.preyEaten) {
      game.leftPlayerVictory();
    }
    // If the right player won
    else if (leftPlayer.preyEaten < rightPlayer.preyEaten) {
      game.rightPlayerVictory();
    }
  }
  // Start the game
  else if (gameStart) {
    // Handle input for left and right players
    leftPlayer.handleInput();
    rightPlayer.handleInput();

    // Move all the players and goals
    leftPlayer.move();
    rightPlayer.move();
    for (let i = 0; i < goals.length; i++) {
      goals[i].move();
    }

    // Check if the players ate the goal.
    for (let i = 0; i < goals.length; i++) {
      leftPlayer.checkEating(goals[i]);
      rightPlayer.checkEating(goals[i]);
    }

    // If the player received support from his family, his health is refreshed.
    successEssentials[0].giveSupport(leftPlayer);
    successEssentials[3].giveSupport(rightPlayer);

    // If the player ....
    successEssentials[1].increaseAwareness(leftPlayer);
    successEssentials[4].increaseAwareness(rightPlayer);
    successEssentials[1].awareness(leftPlayer);
    successEssentials[4].awareness(rightPlayer);

    // If the player came to his friends, he receives consultation.
    successEssentials[2].consultFriends(leftPlayer);
    successEssentials[5].consultFriends(rightPlayer);
    // If the player received consultation, he finds his goals again.
    for (let j = 0; j < goals.length; j++) {
      successEssentials[2].foundThemAgain(goals[j]);
      successEssentials[5].foundThemAgain(goals[j]);
      for (let i = 0; i < barrier.length; i += 2) {
        barrier[i].goalDisappeared = false;
      }
    }

    // If the player encountered barriers, he hesitates about his goals
    // If he hesitated, his goals get invisible.
    for (let j = 0; j < goals.length; j++) {
      for (let i = 0; i < barrier.length - 3; i += 2) {
        barrier[i].lostGoal(leftPlayer);
        barrier[i].lostGoal(rightPlayer);
        barrier[i].goalInvisibility(goals[j]);
      }
    }

    // Display all the elements
    // Barriers
    for (let i = 0; i < barrier.length; i++) {
      barrier[i].display();
    }
    // Success essentials
    for (let i = 0; i < successEssentials.length; i++) {
      successEssentials[i].display();
    }
    // Goals
    for (let i = 0; i < goals.length; i++) {
      goals[i].display();
    }
    // Left and right players
    leftPlayer.display();
    rightPlayer.display();

    // If all goals were acheived by both players or one of them died, the game ends.
    if (leftPlayer.preyEaten + rightPlayer.preyEaten === 5 || leftPlayer.health < 10 || rightPlayer.health < 10) {
      endScreen = true;
      console.log(leftPlayer.preyEaten + rightPlayer.preyEaten);
    }
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
    leftPlayer.preyEaten = 0;
    rightPlayer.preyEaten = 0;
    leftPlayer.health = leftPlayer.maxHealth;
    rightPlayer.health = rightPlayer.maxHealth;
    leftPlayer.x = width / 6;
    leftPlayer.y = height / 3;
    rightPlayer.x = width - 450;
    rightPlayer.y = height / 3;
    endScreen = false;

  }
}

// mousePressed()
//
// Here to require a click to start playing the game
function mousePressed() {
  if (!gameStart) {
    start();
  } else if (endScreen) {
    restart();
  }
}
