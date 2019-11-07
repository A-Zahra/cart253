// goal
//
// A class that represents a goal that moves
// on screen based on a noise() function. It's movement is restricted to the screen size.
// It can be acheived by the player.

class Goal {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(goal) {
    // Position
    this.x = goal.x;
    this.y = goal.y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = goal.speed;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Health properties
    this.maxHealth = goal.radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.radius = this.health;
    this.img = goal.img;
    // Check if the player acheived the goal
    this.goalAcheived = false;
    this.goalDisappeared = false;
    // If the player acheived a goal, assign his ID to isCaught so that the goal is now displayed or counted again
    this.isCaught = -1;
    this.stillExist = 2;
  }

  // move
  //
  // Sets velocity based on the noise() function and the goal's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    this.checkGoalWallCollision();
  }

  // checkGoalWallCollision
  //
  // Check if goal collided one of the screen edges. If so, reverse the direction.
  checkGoalWallCollision() {
    // Check for collisions with top or bottom...
    if (this.x < 0 || this.y < 0 || this.x > width || this.y > height) {
      // It hit so reverse velocity
      this.x -= this.vx;
      this.y -= this.vy;
      // Update time properties
      this.ty = random(0, 100);
      this.tx = random(0, 100);
    }
  }

  // display
  //
  // Draw the goal as an ellipse on the canvas
  // with a radius the same size as its current health.
  // If the goal health was less than the value of stillExist or goalDisappeared gots true,
  // don't display it.
  display() {
    if (this.goalDisappeared === false) {
      if (this.health > this.stillExist) {
        push();
        noStroke();
        imageMode(CENTER);
        this.radius = this.health;
        image(this.img, this.x, this.y, this.radius * 2, this.radius * 2);
        pop();
      }
    }
  }
}
