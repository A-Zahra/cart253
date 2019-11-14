// class Target
//
//
class Target {

  // Constructor
  //
  // Sets the initial values for the target's properties
  // Either sets default values or uses the arguments provided.
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.fillColor = 255;
    this.size = radius;
    this.maxHealth = 255;
    this.health = this.maxHealth;
    this.r = random(0.06, 1.5);
  }

  updateHealth() {
    // Reduce player health
    this.health = this.health - this.r;
    // Constrain the result to a sensible range
    this.health = constrain(this.health, 0, this.maxHealth);
    console.log("health"+this.health);
  }

  // Display target
  display() {
    push();
    noStroke();
    fill(this.fillColor, this.health);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.size, this.size);
    pop();
  }
}
