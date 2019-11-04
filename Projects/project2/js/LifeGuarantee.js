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

    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Health properties
    this.maxHealth = 255;
    this.minHealth = 255;
    this.health = 200 ; // Must be AFTER defining this.maxHealth
    // Display properties
    this.prioritiesImg = player.img;
    this.radius = 35;
    this.r = 0;
    this.awarenessIncrement = false;
    this.goalFound = false;
    this.color = [
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
    for (let i = 0; i < this.color.length; i++) {
      this.fillColor = this.color[i];
    }
  }

  giveSupport(player) {
    let d = dist(this.x, this.y, player.x, player.y);
    if (d < this.radius) {
      player.health = player.maxHealth;
    }
  }
  increaseAwareness(player) {
    let d = dist(this.x, this.y, player.x, player.y);
    if (d < this.radius) {
      this.awarenessIncrement = true;
    }
  }
  awareness(player) {
    if (this.awarenessIncrement) {
      player.speed = this.speed;
    }
  }

  consultFriends(player){
    let d = dist(this.x, this.y, player.x, player.y);
    if (d < this.radius) {
      this.goalFound = true;
    }
  }
  foundThemAgain (goal) {
    if (this.goalFound) {
      for (let i = 0; i < this.color.length; i++) {
        goal.fillColor = this.color[i];
      }
      // this.goalFound = false;
    }
  }

  // display
  //
  // Draw the life essential as an image on the canvas
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
