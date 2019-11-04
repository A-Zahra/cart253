// LifeEssentials
//
// A class that represents life essentials on.
// Each essential has a responsibility. Family gives support
// knowledge saves the player from rush. and friends give consultation to the player.

class LifeGuarantee {

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
    // this.color = [
    //   // Orange
    //   color(255, 100, 10),
    //   // White
    //   color(255, 255, 255),
    //   // Red
    //   color(204, 10, 0),
    //   // green
    //   color(25, 255, 130),
    //   // lemon-colored
    //   color(255, 244, 94)
    // ];
    // for (let i = 0; i < this.color.length; i++) {
    //   this.fillColor = this.color[i];
    // }
    this.opacity = 255;
  }

  // If the essential came to family, he receives support and be refreshed again.
  giveSupport(essential) {
    let d = dist(this.x, this.y, essential.x, essential.y);
    if (d < this.radius) {
      essential.health = essential.maxHealth;
    }
  }

  // If the player came to reading, he would be able to augment his knowledge.
  increaseAwareness(essential) {
    let d = dist(this.x, this.y, essential.x, essential.y);
    if (d < this.radius) {
      this.awarenessIncrement = true;
    }
  }
  // If he augmented his knowledge, his awareness increases.
  awareness(essential) {
    if (this.awarenessIncrement) {
      essential.speed = this.speed;
    }
  }

  // If essential came to friends, he receives consultation.
  consultFriends(essential) {
    let d = dist(this.x, this.y, essential.x, essential.y);
    if (d < this.radius) {
      return true;
    }
    return false;
  }
  // // If he received consultation, his goals appears again.
  // foundThemAgain(goal) {
  //   if (this.goalFound) {
  //       goal.display();
  //   }
  // }

  // display
  //
  // Draw the life essential as an image on the canvas.
  display() {
    push();
    noStroke();
    fill(255);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.radius * 2.5, this.radius * 2.5);
    imageMode(CENTER);
    image(this.essentialImg, this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
  }
}
