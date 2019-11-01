// Prey
//
// A class that represents a simple prey that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by Predator objects.

class Prey {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(prey, color) {
    // Position
    this.x = prey.x;
    this.y = prey.y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = prey.speed;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Health properties
    this.maxHealth = prey.radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.fillColor = color;
    this.radius = this.health;
    // Objects to check if the predator was eaten once
    this.prey1Color = true;
    this.prey2Color = true;
    this.prey3Color = true;
    this.prey4Color = true;
    this.prey5Color = true;
  }

  // move
  //
  // Sets velocity based on the noise() function and the Prey's speed
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

  checkGoalWallCollision() {
    // Check for collisions with top or bottom...
    if (this.x < 0 || this.y < 0 || this.x > width || this.y > height) {
      // It hit so reverse velocity
      this.x -= this.vx;
      this.y -= this.vy;
      // Update time properties
      this.ty = random(0, 100);
      this.tx = random(0, 100);
      console.log("worked1");
    }

  }

  // display
  //
  // Draw the prey as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    fill(this.fillColor);
    ellipseMode(CENTER);
    this.radius = this.health;
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }

  // reset
  //
  // Set the position to a random location and reset health
  // and radius back to default
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
    // Default health
    this.health = this.maxHealth;
    // Default radius
    this.radius = this.health;
    // Random position
    this.speed = floor(random(15, 20));
  }
}
