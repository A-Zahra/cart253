
class Target {

  // Constructor
  //
  // Sets the initial values for the target's properties
  // Either sets default values or uses the arguments provided.
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.fillColor = color(30, 50, 70);
    this.size = radius;
  }

  display() {
    push();
    noStroke();
    fill(this.fillColor);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.size, this.size);
    pop();
  }
}
