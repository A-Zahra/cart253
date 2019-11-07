// LifeEssentials
//
// A class that represents life essentials on.
// Each essential has a responsibility. Family gives support
// knowledge saves the player from rush. and friends give consultation to the player.

class SuccessEssentials {

  // constructor
  //
  // Sets the initial values for the Essential's properties
  // Either sets default values or uses the arguments provided.
  constructor(essential) {
    // Position and speed
    this.x = essential.x;
    this.y = essential.y;
    this.speed = 5;

    // Essentials properties
    this.essentialImg = essential.img;
    this.radius = 35;
    this.awarenessIncrement = false;
    this.goalFound = false;
    this.fillColor = color(255);

  }

  // giveSupport
  //
  // If player overlapped family, sets his health to default value.
  giveSupport(player) {
    let d = dist(this.x, this.y, player.x, player.y);
    if (d < this.radius) {
      player.health = player.maxHealth;
    }
  }

  // consultFriends
  //
  // If player overlapped friends, displays all goals again (send true).
  consultFriends(player) {
    let d = dist(this.x, this.y, player.x, player.y);
    if (d < this.radius) {
      return true;
    }
    return false;
  }

  // display
  //
  // Draw the life essential as an image on the canvas.
  display() {
    push();
    noStroke();
    fill(this.fillColor);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.radius * 2.5, this.radius * 2.5);
    imageMode(CENTER);
    image(this.essentialImg, this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
  }
}
