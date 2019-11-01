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
    this.speed = 20;
    // Velocity and speed
    // this.vx = 0;
    // this.vy = 0;

    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Health properties
    this.maxHealth = 255;
    this.minHealth = 255;
    this.health = 200 ; // Must be AFTER defining this.maxHealth
    // Display properties
    this.prioritiesImg = player.img;
    this.radius = 50;
    this.r = 0;

  }

  giveSupport(player) {
    let d = dist(this.x, this.y, player.x, player.y);
    if (d < this.radius) {
      player.health = player.maxHealth;
    }
  }
  augmentKnowledge(player) {
    let d = dist(this.x, this.y, player.x, player.y);
    if (d < this.radius) {
      player.speed = this.speed;
    }
  }
  // display
  //
  // Draw the prey as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
  //  tint(this.minHealth, this.health);
    fill(255);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.radius * 2.5, this.radius * 2.5);
    imageMode(CENTER);
    image(this.prioritiesImg, this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
  }

}
