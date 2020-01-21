// player
//
// A class that represents a player
// controlled by the arrow keys. It can move around
// the screen and acheive goal objects to win the game.
// The number of goals that the player acheives is displayed on screen.
// Player can acheive each goal only once.
// Player health diminishes gradually and to survive, he should keep receiving family support.

class Player {

  // constructor
  //
  // Sets the initial values for the Player's properties
  // Either sets default values or uses the arguments provided.
  constructor(x, y, speed, radius, up, down, left, right, textX, textY, sprint, sprintKey, playerImage, playerId, sound) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.minHealth = 1;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    // Display properties
    this.playerImage = playerImage;
    this.radius = this.health; // Radius is defined in terms of health
    this.goalGained = 0;
    // If player overlapped a goal, makes this sound
    this.sound = sound;
    // Input properties
    this.upKey = up;
    this.downKey = down;
    this.leftKey = left;
    this.rightKey = right;
    // The goal tracker message position and color
    this.textX = textX;
    this.textY = textY;
    this.fillColor = color(255);
    // Sprint
    this.sprintKey = sprintKey;
    this.sprint = sprint;
    // Player id. Is used to ensure player acheives each goal only once.
    this.playerId = playerId;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the player's
  // velocity appropriately.
  // Add to the player speed once the sprint key is pressed.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    } else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }
    // Sprint
    if (keyIsDown(this.sprintKey)) {
      this.speed = this.sprint;
    } else {
      this.speed = 5;
    }
  }

  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the player has gone off the canvas and
  // wraps it to the other side if so.
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  // checkAcheivement
  //
  // Takes a goal object as an argument and checks if the player
  // overlaps it. If so, reduces the goal's health. If the goal got acheived, it is reset.
  // If the goal health decreases to 0 or less, one point is added to the number of goals acheived by the player.
  checkAcheivement(goal) {
    // Calculate distance from this player to the goal
    let d = dist(this.x, this.y, goal.x, goal.y);
    // Check if the distance is less than their two radius (an overlap)
    if (d < this.radius + goal.radius) {
      // Decrease goal health by the same amount
      // Keeps the goal visible
      if (goal.health > this.minHealth) {
        goal.health -= this.healthGainPerEat;
        goal.goalAcheived = true;
      }
      this.sound.play();

      // If goal's health is less than 1, add one to the goalGained value and Count the goal only once.
      if (goal.health <= this.minHealth) {
        if (goal.goalAcheived) {
          this.goalGained++;
          // Check if the goal was not previously acheived.
          if (goal.isCaught === -1) {
            goal.isCaught = this.playerId;
          }
          goal.goalAcheived = false;
        }
      }
    }
  }

  // goalAcheivementTracker
  //
  // Display the number of goals acheived by player.
  goalAcheivementTracker() {
    push();
    fill(this.fillColor);
    textSize(30);
    text(`Goals achieved: ${this.goalGained}`, this.textX, this.textY);
    pop();
  }

  // display
  //
  // Draw the player as an image on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    imageMode(CENTER);
    this.radius = this.health;
    image(this.playerImage, this.x, this.y, this.radius * 2, this.radius * 2);
    // Display the number of goals acheived by the player
    this.goalAcheivementTracker();
    pop();
  }
}
