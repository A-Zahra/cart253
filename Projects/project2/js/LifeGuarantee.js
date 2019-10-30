// Prey
//
// A class that represents a simple prey that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by Predator objects.

class LifeGuarantee {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(player) {
    // Position
    this.x = player.x;
    this.y = player.y;
    // Velocity and speed
    // this.vx = 0;
    // this.vy = 0;

    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Health properties
    this.maxHealth = 255;
    this.health = 200 ; // Must be AFTER defining this.maxHealth
    // Display properties
    this.prioritiesImg = player.img;
    this.radius = 60;

  }


  // updateHealth()
  //
  // Reduce the player's health (happens every frame)
  // Check if the player is dead
  updateHealth() {
    // Reduce player health
    this.health = this.health - 0.4;
    // Constrain the result to a sensible range
    this.health = constrain(this.health, 0, this.maxHealth);
    // Check if the player is dead (0 health)
    if (this.health < 0) {
      // If so, the game is over
      gameOver = true;
    }
  }

  // display
  //
  // Draw the prey as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    fill(255, this.health);
    image(this.prioritiesImg, this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
  }

}
