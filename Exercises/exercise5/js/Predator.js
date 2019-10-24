// Predator
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume Prey objects to maintain its health.
// The number of preys that the predator eats is displayed on the screen
// There is an alarm message to warn the predator that is not eating a real prey
// There is a message that only appears on the screen once the predator ate a prey for the second time.

class Predator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius, up, down, left, right, textX, textY, sprint, sprintKey) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health; // Radius is defined in terms of health
    // Input properties
    this.upKey = up;
    this.downKey = down;
    this.leftKey = left;
    this.rightKey = right;
    this.preyEaten = 0;
    // The preyEating tracker position
    this.textX = textX;
    this.textY = textY;
    this.sprintKey = sprintKey;
    this.sprint = sprint;
    // The alarm and ateMeBefore messages position
    this.messageX = width / 2;
    this.messageY = height / 3;
    this.Victory = false;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  // Add to the predator speed once the sprint key is pressed
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
  // Checks if the predator has gone off the canvas and
  // wraps it to the other side if so
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

  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleEating(prey) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease prey health by the same amount
      prey.health -= this.healthGainPerEat;
      // Check if the prey died and reset it if so
      // Warn the predator that is not eating the right prey
      this.alarmMessage();
      // Keeps the prey visible
      if (prey.health < 0) {
        prey.reset();
        console.log(prey.reset());
      }
    }
  }

  // checkEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's health. If the prey dies, it gets reset.
  // If the prey health decreases to 0 or less, one point is added to the number of preys eaten by the predator
  // If the predator ate a prey once, don't count it for the second time.
  // If the predator ate 5 preys, the game ends.
  checkEating(prey) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease prey health by the same amount
      // Keeps the prey visible
    //  if (prey.health > 4) {
        prey.health -= this.healthGainPerEat;
    //  }

      // If prey's health is less than 0, add one to the preyEaten value and reset the prey size
      // Count the prey only once. If the same prey was eaten for the second time the point is not counted
      // and instead the message is shown.
      if (prey.health < 0) {
        if (prey.prey1Color) {
          this.preyEaten++;
          prey.prey1Color = false;
        } else if (prey.prey2Color) {
          this.preyEaten++;
          prey.prey2Color = false;
        } else if (prey.prey3Color) {
          this.preyEaten++;
          prey.prey3Color = false;
        } else if (prey.prey4Color) {
          this.preyEaten++;
          prey.prey4Color = false;
        } else if (prey.prey5Color) {
          this.preyEaten++;
          prey.prey5Color = false;
        }
        prey.reset();
      }
      if (!prey.prey1Color || !prey.prey2Color || !prey.prey3Color || !prey.prey4Color || !prey.prey5Color) {
        this.ateMeBefore();
      }
      // If the predator ate five preys, Show the victory screen
      if (this.preyEaten === 5) {
        this.victory = true;
      }
    }
  }

  // preyEatingTracker
  //
  // Display the number of preys eaten by the predator
  preyEatingTracker() {
    push();
    fill(255);
    textSize(30);
    text(`Preys eaten: ${this.preyEaten}`, this.textX, this.textY);
    pop();
  }

  // alarmMessage
  //
  // Display an alarm message when the predator is eating the wrong prey.
  alarmMessage() {
    push();
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text("I am not a real prey sorry", this.messageX, this.messageY);
    pop();
  }

  // ateMeBefore
  //
  // If the prey was eaten once before, show this message
  ateMeBefore() {
    push();
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text("Don't cheat!! You ate me before!!", this.messageX, this.messageY * 2);
    pop();
  }

  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    fill(this.fillColor);
    this.radius = this.health;
    ellipse(this.x, this.y, this.radius * 2);
    // Display the number of preys eaten by the player
    this.preyEatingTracker();
    pop();
  }
}
