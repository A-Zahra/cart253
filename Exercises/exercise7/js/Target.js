// class Target
//
//
class Target {

  // Constructor
  //
  // Sets the initial values for the target's properties
  // Either sets default values or uses the arguments provided.
  constructor(target) {
    this.x = target.x;
    this.y = target.y;
    this.fillColor = target.fillColor;
    this.size = target.radius;
    this.maxHealth = 255;
    this.health = this.maxHealth;
    this.r = random(0.04, 1.5);
  }

  // updateHealth
  //
  // Updates target health
  // I keep this code cause I might want to use it again.
  // updateHealth() {
  //   // Reduce player health
  //   this.health = this.health - this.r;
  //   // Constrain the result to a sensible range
  //   this.health = constrain(this.health, 0, this.maxHealth);
  // }

  goalAchieved(ball) {
    let d = dist(this.x, this.y, ball.x, ball.y);
    if (d < this.size + ball.size) {
      return true;
    }
    return false;
  }

  // Display target
  display() {
    push();
    noStroke();
    fill(this.fillColor);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.size, this.size);
    pop();
  }
}
